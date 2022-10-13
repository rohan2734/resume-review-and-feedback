import React,{useState} from 'react';

import axios from 'axios';

import styles from "./CreateResume.module.css";
import { BASE_URL } from '../Keys/Keys';

const CreateResume = () => {

    // const [resumeName,setResumeName]  = useState("");
    const [resumeDetails,setResumeDetails] = useState({
        resumeName:"",
        resumeStatusMessage : ""
    })

    const handleCreateResumeSubmit = e =>{
        e.preventDefault();
        const data = {
            resumeName : resumeDetails.resumeName
        }
        var token = localStorage.getItem("token");
        //need to add jwt token in headers with Bearer in authorization header
        const headers ={ 
            authorization : `Bearer ${token}`
        }
        axios.post(`${BASE_URL}/api/resumes/create-resume`,data,{headers})
        .then((res)=>{
            console.log({resp: res.data});
            setResumeDetails({...resumeDetails,resumeStatusMessage : res.data.message});

        })
    }

    return (
        <div className={styles.container__parent}>
            <div className={styles.container}>
            <h1 className={styles.container__title}> Resumes</h1>
            <h3 className={styles.container__subtitle}>create your resume  and request for experts review</h3>

            <form className={styles.inputs} onSubmit={handleCreateResumeSubmit}>
                <div className={styles.input__item} >
                    <label className={styles.input__label}>Resume Name</label>
                    <input name="resumeName"  className={styles.input__field} placeholder="enter resume name" value={resumeDetails.resumeName} onChange={e => setResumeDetails({...resumeDetails,resumeName:e.target.value})} type="text"/>
                </div>
                <button className={styles.container__submit} type="submit" >Create Resume</button>
            </form>
            <h4 className={styles.container__subtitle}>{resumeDetails.resumeStatusMessage}</h4>
        </div>
        </div>
        
    );
}

export default CreateResume;