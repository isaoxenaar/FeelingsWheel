import React from 'react'
import MicRecorder from 'mic-recorder';
import { useReactMediaRecorder } from "react-media-recorder";
import Recorder from "recorder-js";

const MicRecord = () => {

    const {status, startRecording, stopRecording, mediaBlobUrl, } = useReactMediaRecorder({audio: true, video: false});
    
    return (
        <>
            <p>{status}</p>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
            {/* <audio src={mediaBlobUrl} controls /> */}
        </>
    )
}

export default MicRecord