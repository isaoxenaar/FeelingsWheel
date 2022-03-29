import Webcam from 'react-webcam'
import React, {useRef, useCallback, useState} from 'react'

const Capture = () => {
    const videoConstraints = {
        width: 360, 
        height: 240, 
        facingMode: "user"
    }
    const WebcamRef = useRef<any>(null);
    const [photo, setPhoto] = useState(null);
    const body = 'https://www.pngall.com/wp-content/uploads/2016/04/Happy-Person-Free-Download-PNG.png';
    const postPhoto = async (url:string) => {
        console.log("typeof: ", typeof photo);
        

        await fetch(`https://finalprojectbackend.azurewebsites.net/api/Face?url=${body}`, {
            method: 'POST', // `data:image/jpeg;base64,${photo}`
            mode: 'cors',
            body: JSON.stringify({photo}),
        }).then(res => console.log(res)).catch(e => console.log(e));
    }
    
    function b64toBlob(b64Data:any, contentType:any, sliceSize:any) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
      
        var byteCharacters = window.atob(b64Data);
        var byteArrays = [];
      
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);
      
          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
      
          var byteArray = new Uint8Array(byteNumbers);
      
          byteArrays.push(byteArray);
        }
          
        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
      }
    
      
      
    const capture = useCallback(() => {
        const photo = WebcamRef.current.getScreenshot();
        var contentType = 'image/png';

        setPhoto(photo);
        console.log("this is photo", photo)
        var b64 = photo.substring(23);
        console.log("this is b64", b64);
        var blob = b64toBlob(b64, contentType, 512);
        var blobUrl = URL.createObjectURL(blob);
        console.log("this is bloburl", blobUrl.substring(5));

        // const formData = new FormData();
        // formData.append("picture", photo);

        // let data = photo.toDataURL('image/jpeg');
        // let blobUrl = ''
        // fetch(body)
        // .then(res => res.blob())
        // .then(blobData => blobUrl = URL.createObjectURL(blobData));
        //     // attach blobData as the data for the post request
        postPhoto('');


    }, [WebcamRef, setPhoto]);

    

    return (
        <section>
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
        </section>
    )
}

export default Capture


// var dataUri = canvas.toDataURL('image/' + format);
// var data = dataUri.split(',')[1];
// var mimeType = dataUri.split(';')[0].slice(5)

// var bytes = window.atob(data);
// var buf = new ArrayBuffer(bytes.length);
// var byteArr = new Uint8Array(buf);

// for (var i = 0; i < bytes.length; i++) {
//     byteArr[i] = bytes.charCodeAt(i);
// }

// return byteArr;

// -------------------------

// let data = canvas.toDataURL('image/jpeg');

//     fetch(data)
//   .then(res => res.blob())
//   .then(blobData => {
//     // attach blobData as the data for the post request