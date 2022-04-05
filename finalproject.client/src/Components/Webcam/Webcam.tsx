import Webcam from 'react-webcam';
import React, {useRef, useCallback, useState, useEffect} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Webcam.css';
import { AspectRatio } from '@cloudinary/url-gen/qualifiers';

const Capture = () => {
    const videoConstraints = {
        width: 300, 
        height: 300, 
        facingMode: "user",
    }

    const WebcamRef = useRef<any>(null);
    const [photo, setPhoto] = useState<string>("");
    const { user } = useAuth0();
    
    const postPhoto = async () => {
        await fetch(`https://localhost:7189/api/Face/${user?.sub}/getResponse`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: `"${photo}"`,
        }).then(res => console.log(res)).catch(console.error);
    }

    const capture = useCallback(() => {
        let photob64 = WebcamRef.current.getScreenshot();
        setPhoto(() => photob64);
        }, [WebcamRef, setPhoto]);

    useEffect(() =>{
        postPhoto()
    },[photo])

    return (
        <section className='webcam'>
            <div id="webcam--camPlusBtn">
            <Webcam 
                audio={false}
                mirrored={true}
                ref={WebcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            >
            {({ getScreenshot }) => (
                <button id={'captureBtn'}onClick={capture}>
                    Capture Photo
                </button>
            )}
            </Webcam>
            </div>
            <div id="log">
            { photo && (<img id={'captureImg'}src={photo} alt="captured face" />)}
            </div>
        </section>
    )
}

export default Capture