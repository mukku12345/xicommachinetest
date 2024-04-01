import React, { useState, useEffect } from 'react';
import API from '../services/ApiServices';
import { ApiEndPoint } from '../services/ApiEndPoint';
import formSchema from '../validation/formSchmea';
import { Formik } from 'formik';
import { toast } from "react-hot-toast";

function Form() {
  const [fName, setFname] = useState("")
  const [lName, setlName] = useState("")
  const [email, setEmail] = useState("")
  const [dob, setDob] = useState("")
  const [pstreet1, setpstreet1] = useState("")
  const [pstreet2, setpstreet2] = useState("")
  const [rstreet1, setrstreet1] = useState("")
  const [rstreet2, setrstreet2] = useState("")
  // const [fileName, setFileName] = useState("");
  // const [fileType, setFileType] = useState("");
  // const [file, setFile] = useState(null);
  const [residenceAddPermanent, setResidenceAddPermanent] = useState(false);
  const [documents, setDocuments] = useState([{ fileName: '', fileType: '', file: null }]);




  const handleAddMore = () => {
    setDocuments([...documents, { fileName: '', fileType: 'img', file: null }]);
  };

  const handleDelete = (index) => {
    const updatedDocuments = [...documents];
    updatedDocuments.splice(index, 1);
    setDocuments(updatedDocuments);
  };

  const handleFileNameChange = (index, value) => {
    const updatedDocuments = [...documents];
    updatedDocuments[index].fileName = value;
    setDocuments(updatedDocuments);
  };

  const handleFileTypeChange = (index, value) => {
    const updatedDocuments = [...documents];
    updatedDocuments[index].fileType = value;
    setDocuments(updatedDocuments);
  };

  const handleFileChange = (index, value) => {
    const updatedDocuments = [...documents];
    updatedDocuments[index].file = value;
    setDocuments(updatedDocuments);
  };



  const submiitForm = (e) => {

    e.preventDefault();

    const headers = {
      // 'Content-Type' : 'multipart/form-data'
    }
    const formData = new FormData();
    formData.append('firstName', fName)
    formData.append('lastName', lName)
    formData.append('email', email)
    formData.append('dob', dob)
    formData.append('residentialAddress[rStreet1]', rstreet1)
    formData.append('residentialAddress[rStreet2]', rstreet2)
    formData.append('permanentAddress[pStreet1]', pstreet1)
    formData.append('permanentAddress[pStreet2]', pstreet2)
    documents.forEach((document, index) => {
      formData.append(`documents[${index}][filename]`, document.fileName);
      formData.append(`documents[${index}][fileType]`, document.fileType);
      formData.append(`documents[${index}][file]`, document.file);
    });



    API.post(ApiEndPoint.Post, formData, { headers: headers })
      .then((response) => {
        console.log("response", response.data);
        toast.success("submitted sucessfully !");
      }).catch((error) => {
        console.log("error", error.response.data.message)
        toast.error(error.response.data.message);
      })


  }





  return (
    <div className='form-container'>
      <h3>Machine Task Xicom</h3>
      <form onSubmit={submiitForm}>
        <div className='form-row'>
          <div className='form-colomn'>
            <label>First Name*</label>
            <input type="text" name="" onChange={(e) => { setFname(e.target.value) }}  required/>
          </div>

          <div class="user-box">
            <label>Last Name*</label>
            <input type="text" name="" onChange={(e) => { setlName(e.target.value) }} required />
          </div>

        </div>

        <div className='form-row'>

          <div class="user-box">
            <label>E-mail*</label>
            <input type="email" name="" onChange={(e) => { setEmail(e.target.value) }} required />
          </div>

          <div class="user-box">
            <label>Date of Birth*</label>
            <input type="date" name="" onChange={(e) => { setDob(e.target.value) }} required
             />
          </div>

        </div>



        <div className='residental_address'>
          <h6 className='form-row'>Residental Address</h6>
          <div className='form-row'>
            <div class="user-box">
              <label>Street 1*</label>
              <input type="text" name="" onChange={(e) => { setrstreet1(e.target.value) }} required />
            </div>

            <div class="user-box">
              <label>Street 2*</label>
              <input type="text" name="" onChange={(e) => { setrstreet2(e.target.value) }}  required/>
            </div>

          </div>
        </div>
        <div className='form-chkbox'>


          <input type='checkbox' onChange={() => { setResidenceAddPermanent(!residenceAddPermanent) }}  />
          <label >Same as Residental Address</label>

        </div>

        <div className='residental_address'>
          <h6 className='form-row'>Permanent Address</h6>
          <div className='form-row'>
            <div class="user-box">
              <label>Street 1</label>
              <input type="text" name="" value={residenceAddPermanent ? rstreet1 : pstreet1} onChange={(e) => { setpstreet1(e.target.value) }}  required/>
            </div>

            <div class="user-box">
              <label>Street 2</label>
              <input type="text" name="" value={residenceAddPermanent ? rstreet2 : pstreet2} onChange={(e) => { setpstreet2(e.target.value) }} required/>
            </div>

          </div>

        </div>

        <div className='residental_address'>
          <h6 className='form-row'>Upload Documents</h6>
          <button  onClick={handleAddMore} className='add-btn' >Add more</button>

          {documents.map((document, index) => (
            <div key={index} className='form-row'>
              <div className="user-box">
                <label>File Name*</label>
                <input type="text" value={document.fileName} onChange={(e) => handleFileNameChange(index, e.target.value)}  required/>
              </div>

              <div className="user-box">
                <label>Type of file*</label>
                <select value={document.fileType} onChange={(e) => handleFileTypeChange(index, e.target.value)}>
                <option value=""></option>
                 
                  <option value="img">image</option>
                  <option value="pdf">pdf</option>
                </select>
              </div>

              <div className="user-box">
                <label>Upload Document*</label>
                <input type="file" accept={document.fileType === "img" ? "image/*" : ".pdf"} onChange={(e) => handleFileChange(index, e.target.files[0])}  required/>
              </div>

              {documents.length > 1 && (
                <button onClick={() => handleDelete(index)} className='del-btn' style={documents.length ==1?{display:"none"}:{}}>Delete</button>
              )}
            </div>
          ))}

          <div></div>        </div>
        <br />
        <input type='submit' className='btn-submit' />

      </form>
    </div>
  )
}

export default Form;