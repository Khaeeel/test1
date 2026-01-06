import React, { useEffect, useRef, useState } from 'react';

export default function PhotoBooth() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
            })
            .catch(() => alert('Camera access denied'));
    }, []);

    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        canvas.width = 300;  // set desired width
        canvas.height = 400; // set desired height

        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataURL = canvas.toDataURL('image/png');
        setCapturedImage(dataURL);
    };

    const savePhoto = async () => {
        if (!capturedImage) return;

        try {
            await fetch('/photobooth/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({ image: capturedImage })
            });

            alert('Photo saved!');
        } catch (err) {
            console.error(err);
            alert('Failed to save photo.');
        }
    };

    return (
        <div>
            <h2>Mini Photobooth 📸</h2>
            <video
                ref={videoRef}
                autoPlay
                style={{ width: '300px', border: '4px solid black' }}
            />
            <div style={{ marginTop: '10px' }}>
                <button onClick={capturePhoto}>Capture</button>
                <button onClick={savePhoto} disabled={!capturedImage}>Save</button>
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {capturedImage && (
                <div style={{ marginTop: '10px' }}>
                    <h4>Preview:</h4>
                    <img src={capturedImage} alt="Captured" style={{ border: '2px solid black' }} />
                </div>
            )}
        </div>
    );
}
