import { utf8_encode } from 'cloudinary-core';
import { blob } from 'node:stream/consumers';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react'
import Recorder from "recorder-js";
import MicRecorder from 'mic-recorder';

const MicRecord = () => {
    const [response, setResponse] = useState<Response>();
    const { user } = useAuth0();

    (window as any).AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
    let context = new AudioContext();
            
    const recorder = new Recorder(context, {
            onAnalysed: data => data,
    });
    // const recorder = new MicRecorder({bitRate: 128,
    //     encoder: 'mp3',
    //     sampleRate: 44100,})
    
    let isRecording:boolean = false;

    let blobblob: Blob = new Blob();

    navigator.mediaDevices.getUserMedia({audio: true})
        .then(stream => recorder.init(stream))
        .catch(err => console.log('Uh oh... unable to get stream...', err));
            
    const downloader = () => {
        
        Recorder.download((blobblob), 'testfile');}
    
    const startRecording = async () => {
        let responsedata = '';
        const response = await fetch(`https://localhost:7189/api/Speech/${user?.sub}`,{
            method: 'POST',
            headers: {
            },
        }).then(res => res.json()).then(data => responsedata = data).catch(console.error);

        console.log(responsedata);
        recorder.start()
            .then(() => isRecording = true);
            
        }
    
    const stopRecording = () => {
        isRecording = false;
        recorder.stop()
        .then(({blob, buffer}) => {
            console.log("in stop stop stop" + blob.size);
            blobblob = blob;
            console.log("after asign" + blobblob.size);
            const file = new File(buffer, 'me-at-thevoice.mp3', {
                type: blob.type,
                lastModified: Date.now()
              });
              console.log("file" + file.name);
            }).then(() => downloader());
    }

    return (
        <>
            <p>hello mic</p>
            <button onClick={() => startRecording()}>Start Recording</button>
            <button onClick={() => stopRecording()}>Stop Recording</button>
        </>
    )
}

export default MicRecord