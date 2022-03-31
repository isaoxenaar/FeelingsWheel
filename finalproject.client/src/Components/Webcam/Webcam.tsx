import Webcam from 'react-webcam';
import React, {useRef, useCallback, useState, useEffect} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Webcam.css';

const Capture = () => {
    const videoConstraints = {
        width: 100, 
        height: 100, 
        facingMode: "user"
    }

    const WebcamRef = useRef<any>(null);
    const [photo, setPhoto] = useState<string>("");
    const { user } = useAuth0();
    
    const postPhoto = async () => {
        console.log("typeof: ", typeof photo);
        console.log(photo, "in post photo");
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
        // maybe this? => setPhoto(WebcamRef.current.getScreenshot());
        console.log(typeof photob64)
        console.log(photob64, " in usecallback");
        setPhoto(() => photob64);
        console.log(photo, " state");
    }, [WebcamRef, setPhoto]);

    useEffect(() =>{
        postPhoto()
    },[photo])

    return (
        <section className='webcam'>
            <Webcam 
                audio={false}
                mirrored={true}
                ref={WebcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            >
            {({ getScreenshot }) => (
                <button onClick={capture}>
                    Capture Photo
                </button>
            )}
            </Webcam>
            { photo && (<img src={photo} alt="captured face" />)}
            <div id="main"></div>
            <div id="log"></div>
        </section>
    )
}

export default Capture