
import { useState } from 'react';
import axios from 'axios';

const Uploadsfile = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);

    const onsubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8080/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded successfully:', response);
            console.log('Upload success:', response.data);
            onUploadSuccess();
        } catch (err) {
            console.error('Upload error:', err);
        }
    };

    return (
        <>
            <form onSubmit={onsubmit} className="upload-form">
                <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default Uploadsfile