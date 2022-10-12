import React,{useState} from 'react';

import axios from 'axios';

import styles from "./CreateResume.module.css";

const CreateResume = () => {

    const [resumeName,setResumeName]  = useState("");

    const handleCreateResumeSubmit = e =>{
        e.preventDefault();
    }

    return (
        <div className={styles.container__parent}>
            <div className={styles.container}>
            <h1 className={styles.container__title}> Resumes</h1>
            <h3 className={styles.container__subtitle}>create your resume  and request for experts review</h3>

            <form className={styles.inputs} onSubmit={handleCreateResumeSubmit}>
                <div className={styles.input__item} >
                    <label className={styles.input__label}>Resume Name</label>
                    <input name="resumeName"  className={styles.input__field} placeholder="enter resume name" value={resumeName} onChange={e => setResumeName(e.target.value)} type="text"/>
                </div>
                <button className={styles.container__submit} type="submit" >Create Resume</button>
            </form>
        </div>
        </div>
        
    );
}

export default CreateResume;