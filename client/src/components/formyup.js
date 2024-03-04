import React, { useState, useEffect } from 'react';
import API from '../services/ApiServices';
import { ApiEndPoint } from '../services/ApiEndPoint';
import { useFormik } from "formik";
import formSchema from '../validation/formSchmea';

function Formyup() {
  const [fName, setFname] = useState("")
  const [lName, setlName] = useState("")
  const [email, setEmail] = useState("")
  const [dob, setDob] = useState("")
  const [pstreet1, setpstreet1] = useState("")
  const [pstreet2, setpstreet2] = useState("")
  const [rstreet1, setrstreet1] = useState("")
  const [rstreet2, setrstreet2] = useState("")
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [file, setFile] = useState(null);
  const [residenceAddPermanent, setResidenceAddPermanent] = useState(false)


  const formik = useFormik({
    initialValues: { fName: "", lName: "", email: "", dob: "", rStreet1: "", rStreet2: "", residenceAddPermanent: false, pStreet1: "", pstreet2: "", fileName: "", fileType: "", file: null },
    validationSchema: formSchema,
    onSubmit: (values, { setSubmitting }) => {
      submiitForm(values);
      setSubmitting(false);
    },
  });



  const submiitForm = (e) => {

    e.preventDefault();

    const headers = {
      // 'Content-Type' : 'multipart/form-data'
    }
    const formData = new FormData();
    formData.append('firstName', formik.values.fName)
    formData.append('lastName', formik.values.lName)
    formData.append('email', formik.values.email)
    formData.append('dob', formik.values.dob)
    formData.append('residentialAddress[rStreet1]', formik.values.rstreet1)
    formData.append('residentialAddress[rStreet2]', formik.values.rstreet2)
    formData.append('permanentAddress[pStreet1]', formik.values.pstreet1)
    formData.append('permanentAddress[pStreet2]', formik.values.pstreet2)
    formData.append('documents[][filename]', formik.values.fileName)
    formData.append('documents[0][fileType]', formik.values.file)



    API.post(ApiEndPoint.Post, formData, { headers: headers })
      .then((response) => {
        console.log("response", response.data);

        alert("posted")
      }).catch((error) => {
        console.log("error", error)
        alert("error")
      })


  }



  console.log("filetype", fileType)


  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className='d-form'>
        {formik.touched.fName && formik.errors.fName && (
              <div className="error">{formik.errors.fName}</div>
            )}
          <div class="user-box">
            <label>First Name*</label>
            <input type="text"
              name="fName"

              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fName} />
          </div>

          <div class="user-box">
          {formik.touched.lName && formik.errors.lName && (
              <div className="error">{formik.errors.lName}</div>
            )}
            <label>Last Name*</label>
            <input type="text" 
            
            name="lName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lNameName}
            
            />
          </div>

        </div>

        <div className='d-form'>
        {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          <div class="user-box">
            <label>E-mail*</label>
            <input type="email" 
             name="email"

              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email} />
          </div>

          <div class="user-box">
          {formik.touched.dob && formik.errors.dob && (
              <div className="error">{formik.errors.dob}</div>
            )}
            <label>Date of Birth*</label>
            <input type="date" 
               name="dob"

              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dob}/>
          </div>

        </div>



        <div className='residental_address'>

          <h6>Residental Address</h6>
          <div class="user-box">
          {formik.touched.rStreet1 && formik.errors.rStreet1 && (
              <div className="error">{formik.errors.rStreet1}</div>
            )}
            <label>Street 1*</label>
            <input type="text" 
             name="rStreet1"

              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rStreet1} />
          </div>

          <div class="user-box">
          {formik.touched.rStreet2 && formik.errors.rStreet2 && (
              <div className="error">{formik.errors.rStreet2}</div>
            )}
            <label>Street 2*</label>
            <input type="text"
               name="rStreet2"

              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rStreet2}  />
          </div>

        </div>

        <div>

          <input type='checkbox' 
           name="residenceAddPermanent"
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.residenceAddPermanent} />
          
          
          <label>Same as Residental Address</label>

        </div>

        <div className='residental_address'>
          <h6>Permanent Address</h6>
          <div class="user-box">
          {formik.touched.pStreet1 && formik.errors.pStreet1 && (
              <div className="error">{formik.errors.pStreet1}</div>
            )}
            <label>Street 1</label>
            <input type="text" name="pstreet1" value={formik.values.residenceAddPermanent ? formik.values.rstreet1 :formik.values.pstreet1} onChange={(e) => { setpstreet1(e.target.value) }} />
          </div>

          <div class="user-box">
          {formik.touched.pstreet2 && formik.errors.pstreet2 && (
              <div className="error">{formik.errors.pstreet2}</div>
            )}
            <label>Street 2</label>
            <input type="text" name="pstreet2" value={formik.values.residenceAddPermanent ? formik.values.rstreet2 :formik.values.pstreet2} onChange={(e) => { setpstreet2(e.target.value) }} />
          </div>

        </div>


        <div className='residental_address'>
          <h6>Upload Documents</h6>
          <div class="user-box">
          {formik.touched.fileName && formik.errors.fileName && (
              <div className="error">{formik.errors.fileName}</div>
            )}
            <label>File Name*</label>
            <input type="text" 
             name="fileName"
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.fileName} />
          </div>

          <div class="user-box">
          {formik.touched.fileType && formik.errors.fileType && (
              <div className="error">{formik.errors.fileType}</div>
            )}
            <label>Type of file</label>
            <select 
              name="fileType"
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.fileType} >
              <option value="img">image</option>
              <option value="pdf">pdf</option>
            </select>
          </div>

          <div class="user-box">
            <label>Upload Document</label>
            {formik.touched.file && formik.errors.file && (
              <div className="error">{formik.errors.file}</div>
            )}
            <input type="file"  accept={fileType == "img" ? "image/*" : ".pdf"} 
             name="file"
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           value={formik.values.file} />
          </div>

        </div>
        <br />
        <input type='submit' />

      </form>
    </div>
  )
}

export default Formyup;