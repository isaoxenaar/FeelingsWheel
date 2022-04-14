import React, { useState, useEffect } from 'react'
import './MicRecord.css'
import * as data from '../../Data/byType';
import { useAuth0 } from '@auth0/auth0-react';
import Recorder from "recorder-js";

const MicRecord = () => {

    const [response, setResponse] = useState<Response>();
    //const [sound, setSound] = useState<string>();
    const [analyzed, setAnalyzed] = useState<string>("");
    const [emoColor, setEmoColor] = useState<string>("white");
    const [userData, setUserData] = useState<any>();
    const { user } = useAuth0();

    (window as any).AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
    let context = new AudioContext();   
    const recorder = new Recorder(context, {
            onAnalysed: data => data,
    });

    //let isRecording:boolean = false;
    //let blobblob: Blob = new Blob();

    navigator.mediaDevices.getUserMedia({audio: true})
        .then(stream => recorder.init(stream))
        .catch(err => console.log('Uh oh... unable to get stream...', err));

        const txtAnalyzer = () => {
            const str = response ? response.toString() : "we did not hear you, tell us again."
            let advice = "";
    
            const coreFeeling = data.default.core.find((cr:any) => { 
                const hasKey = cr.keywords.map((word:any) => {
                    return str.includes(word) ? "yes" : "no";       
                })
                if(hasKey.includes("yes")){
                    return cr
                }
            })
            if(coreFeeling) {
                advice = `you prob feel ${coreFeeling.name}, remember ${coreFeeling.content}`
                setEmoColor(coreFeeling.color);
            }
            if(!coreFeeling) {
                setEmoColor("white");
            }
            const el = document.getElementById("app--body");
            el?.setAttribute("style", `background-color: ${emoColor}`);
            setAnalyzed(advice);
        }    
    useEffect(() => {
        txtAnalyzer();
    } ,[response, analyzed, emoColor, txtAnalyzer])

    const downloader = () => {
        //Recorder.download((blobblob), 'testfile');
    }
    

    const startRecording = async () => {
        let responsedata = '';
        const response = await fetch(`https://finalprojectbackend.azurewebsites.net/api/Speech/${user?.sub}`,{
            method: 'POST',
            headers: {
            },
        }).then(res => res.json()).then(data => responsedata = data).catch(console.error);

        setResponse(response)
        stopRecording();
        recorder.start();
         //isRecording = true
        }
    
    const stopRecording = async() => {
        //isRecording = false;
        recorder.stop()
        .then(({blob, buffer}) => {
            // const file = new File(buffer, 'me-at-thevoice.mp3', {
            //     type: blob.type,
            //     lastModified: Date.now()
            //   });
              //setSound(file.name);
            }).then(() => downloader());
            await fetch(`https://finalprojectbackend.azurewebsites.net/api/User/${user?.sub}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(data => setUserData(JSON.parse(data.textSentiment)));
    }

    return (
        <>
            <section id="mic--Main">
                <h2 className="mic--Title">How do you feel?</h2>
                <h3 className="mic--Response">{response} </h3>
                <h3 className="mic--Advice">{analyzed} </h3>
                <p className="mic--Emotions--Title">your intonation is</p>
                <div className='emo--container'>
                    <div className="mic--Emotions">
                        <p className="mic--positivity" id="positivity" style={{width:`${userData && userData.positivity}px`}}>{userData && parseInt(userData.positivity)+'% '}</p>
                        <p className="mic--negativity" id="negativity" style={{width:`${userData && userData.negativity}px`}}>{userData && parseInt(userData.negativity)+'% '}</p>
                        <p id='positivity--text'>positive</p>
                        <p id='negativity--text'>negative</p>
                    </div>
                </div>
                <section className="mic--Buttons">
                    <button className="mic--startBtn" onClick={() => startRecording()}>Start</button>
                    <button className="mic--stopBtn" onClick={() => stopRecording()}>Stop</button>
                </section>
            </section>
        </>
    )
}

export default MicRecord