import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
 const UploadPage = () => {


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

        if (selectedFile!=null){
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        
        formData.append(
            "myFile",
            selectedFile,
            selectedFile?.name
        );
        
        // Details of the uploaded file

        // Request made to the backend api
        // Send formData object
         
        const data = await axios.post("http://localhost:8000/api/upload/", formData).then(async (data) => {

            navigate("/analyze",{state:data.data});


        }).catch(error=>
            {
                if (error.response.status===500){
                    toast.error("Cannot detect sip protocol")
                }
            })
        ;}else{
            toast.error('Choose before Pressing the Upload button')
        }
    };
    return (
       <div className="text-center mt-20">
                <h1 className="text-3xl my-10">
                    Select Packet file to analyze
                </h1>
                <h3 className="my-6">
                    File Upload
                </h3>
                <div>
                    <input style={{marginRight:"20px"}} type="file" onChange={onFileChange} accept={".pcap"} />
                    <button className=" bg-[#ea2127] text-white  px-8 py-4 rounded-xl" onClick={onFileUpload}>
                        Upload!
                    </button>
                </div>
                {fileData()}
            </div>
    )
}
export default UploadPage;