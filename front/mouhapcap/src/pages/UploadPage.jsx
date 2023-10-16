import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
export const UploadPage = () => {


    const [selectedFile, setSelectedFile] = useState(null);

    const onFileChange = (event) => {

        // Update the state
      setSelectedFile(event.target.files[0]) ;
    };

    const navigate = useNavigate();
    const fileData = () => {

        if (selectedFile!=null) {

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {selectedFile.name}</p>

                    <p>File Type: {selectedFile.type}</p>

                    <p>
                        Last Modified:{" "}
                        {selectedFile.lastModifiedDate.toDateString()}
                    </p>

                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };
    const onFileUpload = async () => {


        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            selectedFile,
            selectedFile.name
        );

        // Details of the uploaded file

        // Request made to the backend api
        // Send formData object

        const data = await axios.post("http://localhost:8000/api/upload/", formData).then(async (data) => {

            navigate("/analyze",{state:data.data});


        });
    };
    return (
       <div>
                <h1>
                    Select Packet file to analyze
                </h1>
                <h3>
                    File Upload
                </h3>
                <div>
                    <input style={{marginRight:"20px"}} type="file" onChange={onFileChange} accept={".pcap"} />
                    <button onClick={onFileUpload}>
                        Upload!
                    </button>
                </div>
                {fileData()}
            </div>
    )
}