import Webcam from 'react-webcam';
import * as fs from 'fs';
//import { writeFile } from 'fs';
import { Buffer } from 'buffer';
import React, {useRef, useCallback, useState} from 'react'
import Cloud from './Cloud'

const Capture = () => {
    const videoConstraints = {
        width: 50, 
        height: 50, 
        facingMode: "user"
    }

    const WebcamRef = useRef<any>(null);
    
    const [photo, setPhoto] = useState(null);
    const body = 'https://www.pngall.com/wp-content/uploads/2016/04/Happy-Person-Free-Download-PNG.png';
    const data = new FormData();
    
    const postPhoto = async (url:string) => {
        console.log("typeof: ", typeof photo);
        await fetch(`http://localhost:5129/api/Face/getResponse`, {
            method: 'POST', // `data:image/jpeg;base64,${photo}`
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(photo),
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
        var contentType = 'image/jpeg';
        setPhoto(photo);
        
        console.log("this is photo", photo)
        var b64 = photo.substring(22);
        
        console.log("this is b64", b64);
        
        // var buf = new Buffer(b64, 'base64');
        // fs.writeFile("image.png", buf, (err => {
        //     if(err) {
        //         console.log("error")
        //     }
        //     else {
        //         console.log("error")
        //     }
        // }));
        
        var blob = b64toBlob(b64, contentType, 512);
        var blobUrl = URL.createObjectURL(blob);
        
        console.log("this is bloburl", blobUrl.substring(5));
        postPhoto(photo);
    }, [WebcamRef, setPhoto]);

    function getBase64Img() {
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAMFBMVEX////7+/vr6+vNzc2qqqplywBWrQD/Y5T/JTf+AADmAABeeEQvNydqAAAGBAMAAAGoF14oAAAEBUlEQVR42u2WTUwUVxzA/2925LIojsyqCLtMqSQeFJeFROPHstjdNkZdkaiX9mRTovYgSYNFE43Rg5IeNG5SqyaVcGzXkvTm7hZWq9bKriAYYzSLBI3WAplp0jY2kV3fzPuYGcBxD/bmO0zevPeb//f7v0FQ5EDvwf8LFG89ixYDol9Wo+smKal2sHF6kM6q7qbE5tY03d7SHR6ygiuvwY1txkzIlPaD3NQ4Zryk/PCP1wKibBlI97dq+idXUxqgcEkVnruS/smRpuWaCbrHU5pc/wyTQsata0U77wVBTlRP9UNkT9oE61K9AHL9VERbeTVurMjNm54mqrFw8CwKmWBfpf6V2Dx/TdxN3YjMf2JwIEZ8JnjnEbEjvLAQZ1EKlxkciJ9UcdD1Z5ztDmgsgPIrMkWtMgfd41xOYXZOIjUcLB3tdchypHWIgb5k2gH0nE0zMHjRCRTLWxgY/VQrDuybcAQ/DDEwmwEn8COlSDBcTUE0GXcEjRzqoDDhDH7sfccg2szAt9hogjBFQFRmDyd9N1VTEFegXXKEVKQFJHEUd0DSKhLthIm0HSQpnNdCNizgq147GP0m7QTygNMye6NqM9ekwlG4kLI5I4cMZ+bVhMA8MwX1rw9oIjakAYX6jXlBRRJ4BF6PwmRSfQyLFhJwWy/IG8khKuirljODG0DfGAd3qCBNEol5vCqFAxqYLeUyB0H2A2Q0DspRD3BQfJEc5KBl6KprG6pNEPqqfkKzOQBsha2bQeVw6g3nSySaGYgb99ylhsLDLVYQ3E+oozOGHKzVbCBs+HkuUm6ivd4E0ZYeNTPTTrn51+0wA9TJgpZVLeaV1y+4yS8c64W0/AcFTBCHK/fFEMwFAmo4KRldE0ZxsF8cGbTuzYqHtOz8t6e8TMk5CcjNSC+kdcfgPyag9AoDhUQARmvAcIiAW3v0JzWJg64BJXdBQ21+/b4zwMqRW5dA2h3I7+onYJd+Y4i3FbyMxz4hxE7hS2MBdSq6Fgq6Bny/dxv6Sk76COj6Yz91ZG8dToQ7oYNCqu4QjX9FK5UoPt/PXO701mruhwcxGP2ecahzzxBtUtlzLHclsXtBA6wc+a2brlUc8TCvg5cPM7LiaOPT8Y4ub3bpAbqy+MQ18xRmvIe5nr83YXDt8Nca0/GveWniSHByybEVwx1dD1ccYB/6yF8DTaGcYLFA391o6DjjohaWfKXQ/xCWazmhPDhNbYf2WH4fse9zhRUkLwrXlUD+9iVD5HR77KWheclxkqsZ1bM+pqcWZ2xVe0zXjPb6pyO8IK1l5trcA7mLKuo48+VpQG0BuPmZeTbs9Vi+9oQyqv6Ieyou4FybU+HqRS4o+TH1VG7MvgFFjvfguwFfA4FobmCxcnTPAAAAAElFTkSuQmCC";
    }
    var base64img = getBase64Img();
    function Base64ToImage(base64img: any, callback: any) {
        var img = new Image();
        img.onload = function() {
            callback(img);
        };
        img.src = base64img;
    }
    Base64ToImage(base64img, function(img: any) {
        document.getElementById('main').appendChild(img);
        var log = "w=" + img.width + " h=" + img.height;
        document.getElementById('log').value = log;
    });
    
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
        <Cloud base64={photo} />
        <div id="main"></div>
        <div id="log"></div>
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
// var webpack = require('webpack');
// var path = require('path');

// var BUILD_DIR = path.resolve(__dirname, 'public');
// var APP_DIR = path.resolve(__dirname, 'src');

// var config = {
//     entry: APP_DIR + '/index.jsx',
//     output: {
//         path: BUILD_DIR,
//         filename: 'bundle.js'
//     },
//     module : {
//         loaders : [
//             {
//                 test : /\.jsx?/,
//                 include : APP_DIR,
//                 loader : 'babel'
//             }
//         ]
//     }
// };

// module.exports = config;