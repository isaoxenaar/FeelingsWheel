import { utf8_encode } from 'cloudinary-core';
import { blob } from 'node:stream/consumers';
import React from 'react'
import Recorder from "recorder-js";

const MicRecord2 = () => {

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
            
    const downloader = () => {
        console.log("this is blob" + blobblob.size);
        //console.log(URL.createObjectURL(blobblob));
        var fd=new FormData();
        fd.append("audio_data",blobblob, "output.wav")
        console.log(fd, "is this a wav?")
        Recorder.download((blobblob), 'testfile'); // downloads a .wav file
        var fileUrl = ""
        blobblob.text().then(async e => {
            console.log('blobdata', e.substring(40));
            await fetch(`https://localhost:7189/api/Speech`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(e.substring(40))
        }).then(e => console.log(e)).catch(console.error)
    });
    }
    
    const startRecording = () => {
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

export default MicRecord2