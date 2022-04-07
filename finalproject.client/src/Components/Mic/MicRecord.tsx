import React, { useState, useEffect } from 'react'
import './MicRecord.css'
import { useAuth0 } from '@auth0/auth0-react';
import Recorder from "recorder-js";

const MicRecord = () => {

    const [response, setResponse] = useState<Response>();
    const [sound, setSound] = useState<string>();
    const [analyzed, setAnalyzed] = useState<string>();
    const [emoColor, setEmoColor] = useState<string>("white");
    const { user } = useAuth0();

    (window as any).AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
    let context = new AudioContext();   
    const recorder = new Recorder(context, {
            onAnalysed: data => data,
    });

    let isRecording:boolean = false;
    let blobblob: Blob = new Blob();

    navigator.mediaDevices.getUserMedia({audio: true})
        .then(stream => recorder.init(stream))
        .catch(err => console.log('Uh oh... unable to get stream...', err));

    useEffect(() => {
        txtAnalyzer();
    } ,[response, analyzed, emoColor])

    const downloader = () => {
        //Recorder.download((blobblob), 'testfile');
    }
    
    const txtAnalyzer = () => {
        const str = response ? response.toString() : "we did not hear you, tell us again."
        let advice = "not sure what you are feeling";
        if(str.includes("fell") || str.includes("cut"))
            advice = "get a bandaid";
        if(str.includes("angry")){
            advice = "last time you were angry you went running and it helped.";
            setEmoColor("#e56bb5");
        }
        if(str.includes("nervous")) {
            advice = "you might feel anxious lay on the floor and breath ten times";
            setEmoColor("grey")
        }
        const el = document.getElementById("app--body");
        el?.setAttribute("style", `background-color: ${emoColor}`);
        setAnalyzed(advice);
    }

    const startRecording = async () => {
        let responsedata = '';
        const response = await fetch(`https://localhost:7189/api/Speech/${user?.sub}`,{
            method: 'POST',
            headers: {
            },
        }).then(res => res.json()).then(data => responsedata = data).catch(console.error);
        console.log(responsedata);
        setResponse(response)
        stopRecording();
        recorder.start()
            .then(() => isRecording = true);
        }
    
    const stopRecording = () => {
        isRecording = false;
        recorder.stop()
        .then(({blob, buffer}) => {
            blobblob = blob;
            console.log("this is blob" + blob.size)
            const file = new File(buffer, 'me-at-thevoice.mp3', {
                type: blob.type,
                lastModified: Date.now()
              });
              setSound(file.name);
            }).then(() => downloader());
    }

    return (
        <>
            <section id="mic--Main">
                <h3 className="mic--Title">How do you feel?</h3>
                <h3 className="mic--Advice">you said: {response} advice: {analyzed}</h3>
                <h1> </h1>
                <section className="mic-Buttons">
                    <button className="mic--startBtn" onClick={() => startRecording()}>Start</button>
                    <button className="mic--stopBtn" onClick={() => stopRecording()}>Stop</button>
                </section>
            </section>
        </>
    )
}

export default MicRecord