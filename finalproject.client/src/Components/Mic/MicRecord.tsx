import React, { useState, useEffect } from 'react'
import './MicRecord.css'
import { useAuth0 } from '@auth0/auth0-react';
import Recorder from "recorder-js";
import { fileURLToPath } from 'url';

const MicRecord = () => {

    const [response, setResponse] = useState<Response>();
    const [sound, setSound] = useState<string>();
    const [analyzed, setAnalyzed] = useState<string>();
    const { user } = useAuth0();

    (window as any).AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
    let context = new AudioContext();   
    const recorder = new Recorder(context, {
            onAnalysed: data => data,
    });
    let isRecording:boolean = false;
    let blobblob: Blob = new Blob();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({audio: true})
        .then(stream => recorder.init(stream))
        .catch(err => console.log('Uh oh... unable to get stream...', err));
    } ,[sound])

    const downloader = () => {
        //Recorder.download((blobblob), 'testfile');
    }
    
    const txtAnalyzer = (txt:string) => {
            //stress//pain//hurt//nervous//happy//sad//angry
            
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
        recorder.start()
            .then(() => isRecording = true);
        }
    
    const stopRecording = () => {
        isRecording = false;
       
        recorder.stop()
        .then(({blob, buffer}) => {
            //console.log("in stop stop stop" + blob.size);
            blobblob = blob;
            //console.log("after asign" + blobblob.size);
            const file = new File(buffer, 'me-at-thevoice.mp3', {
                type: blob.type,
                lastModified: Date.now()
              });
              var url = window.URL.createObjectURL(blob);
              var li = document.createElement('li');
              var au = document.createElement('audio');
              var hf = document.createElement('a');
        
              au.controls = true;
              au.src = url;
              hf.href = url;
              hf.download = new Date().toISOString() + '.wav';
              hf.innerHTML = hf.download;
              li.appendChild(au);
              li.appendChild(hf);
              recordingslist.appendChild(li);
              const music = new Audio(file.name);
              music.play();
              setSound(url);
              console.log("file" + file);
            }).then(() => downloader());
    }

    return (
        <>
            <section className="mic--Main">
                <h3 className="mic--Title">How do you feel?</h3>
                <h3 className="mic--Advice">you said: {response} {sound ? sound: ""}</h3>
                <section className="mic-Buttons">
                    <audio className="mic--Player"controls>
                        <source src={sound ? sound: ""} type="audio/mp3"/>
                            Your browser does not support the audio element.
                    </audio>
                    <button className="mic--startBtn" onClick={() => startRecording()}>Start</button>
                    <button className="mic--stopBtn" onClick={() => stopRecording()}>Stop</button>
                </section>
            </section>
        </>
    )
}

export default MicRecord