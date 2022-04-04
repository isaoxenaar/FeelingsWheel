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
        Recorder.download((blobblob), 'my-audio-file'); // downloads a .wav file
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