import React, { Component } from 'react';
import { render } from 'react-dom';
import { Cloudinary } from '@cloudinary/url-gen';
import cloudinary from 'cloudinary-core';
import Axios from 'axios';

const Cloud = (base64:any) => {
    const UploadImage = (base64:any) => {
        const data = new FormData()
        data.append('file', base64)
        data.append("upload_preset", "images")
        fetch('https://api.cloudinary.com/v1_1/pearltusk/upload', {method: 'post', body: data})
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(err => console.error('Error:', err));
    }
    //cloudinary.Upload(UploadParams params);

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'demo'
        }
    });
    return (
        <>
            <button onClick={() => UploadImage(base64)}>Upload</button>
        </>
    )
}

export default Cloud;