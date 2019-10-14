import React, { useState } from 'react';

const Uploader = ({sendToServer}) => {
    const [selectedFile, setFile] = useState(null);
    
    const fileInput = React.createRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("in submit");

        const data = new FormData();
        data.append('file', selectedFile);
        sendToServer(data);

    };
    const stil = {
        width: '50%'
    }
    return (
        <>
            <form className="input-group" style={stil} onSubmit={handleSubmit}>
                <div className="input-group-prepend">
                    <button type="submit" className="input-group-text">Upload</button>
                </div>
                <div className="custom-file">
                    <input type="file"
                        className="custom-file-input"
                        aria-describedby="inputGroupFileAddon01"
                        ref={fileInput}
                        onChange={(e) => { setFile(e.target.files[0]) }} />
                    <label className="custom-file-label">
                        {selectedFile ? (selectedFile.name) : "Choose File"}

                    </label>
                </div>
            </form>
           
            
        </>
    );


}

export default Uploader;