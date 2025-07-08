import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';



const Files = ({ refresh }) => {

    const [files, setFiles] = useState([]);
    const getFiles = async () => {
        try {
            const response = await axios.get('http://localhost:8080/files');
            console.log('Fetched files:', response.data);
            setFiles(response.data); 
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    useEffect(() => {
        getFiles(); 
    }, [refresh]);


    return (
        <>

            <ul className="file-list">
                {files.map((file, index) => (
                    <li key={index} className="file-item">
                        <img
                            src={`http://localhost:8080/${file.filename}`}
                            alt={file.originalname || 'uploaded file'}
                        />
                        
                    </li>
                ))}
            </ul>

        </>
    )
}

export default Files;