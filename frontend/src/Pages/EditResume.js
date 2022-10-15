import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import styles from "./EditResume.module.css";

import { BASE_URL } from '../Keys/Keys';

import EditResumeNameDetails from '../Components/EditResumeNameDetails';

// import editIconBlack from "../icons/edit_pencil_icon__black.png"
// import defaultProfilePic from "../images/profile_pic.png"
// import emailIcon from "../icons/email_icon.png";
// import phoneIcon from "../icons/phone_icon.png";
// import locationIcon from "../icons/location_icon.png";


const EditResume = ()  => {
    const {resumeId} = useParams();


    const [resumeDetails,setResumeDetails] = useState({
        resumeName:"",
        fullName:"",
        phoneNumber:"",
        address:"",
        gender:"",
        profilePicURL:"",
        linkedinURL:"",
        githubURL : "",
        mediumURL : "",
        websiteURL: "",
        profileDescription: "",
        //embedded objects
        professionalExperiences : [],
        skills : [],
        projects: [],
        certificates: [],
        awards: [],
        education: {},
        //belongs to user
        user: ""
    })

    useEffect(()=> {

        var token = localStorage.getItem("token");
        console.log({token20f: token});

        // token = token.slice(1,-1)
      
        const headers ={ 
            authorization : `Bearer ${token}`
        }

        axios.get(`${BASE_URL}/api/resumes/get-resume/${resumeId}`,{headers})
        .then(res =>{
            console.log({resData: res.data});
            // setResumeDetails({
            //     ...resumeDetails,
            //     resumeName : res.data.resume.resumeName,
            //     fullName: res.data.resume.fullName,
            //     phoneNumber:res.data.resume.phoneNumber,
            //     address: res.data.resume.address,
            //     gender: res.data.resume.gender,
            //     profilePicURL: res.data.resume.profilePicURL,
            //     linkedinURL: res.data.resume.linkedinURL,
            //     githubURL : res.data.resume.githubURL,
            //     mediumURL : res.data.resume.mediumURL,
            //     websiteURL: res.data.resume.websiteURL,
            //     profileDescription: res.data.resume.profileDescription,
            //     //embedded objects
            //     professionalExperiences : res.data.resume.professionalExperiences,
            //     skills : res.data.resume.skills,
            //     projects: res.data.resume.projects,
            //     certificates: res.data.resume.certificates,
            //     awards: res.data.resume.awards,
            //     education: res.data.resume.education,
            //     //belongs to user
            //     user: res.data.resume.user
            // })
            setResumeDetails({
                ...resumeDetails,
                ...res.data.resume
            })
           
        })
        .catch(err =>{
            console.log(err);
        })
    },[])

    return (
        <div className={styles.container}>
            {console.log({resumeDetails})}
            <div className={styles.resume__name}>{resumeDetails?.resumeName}</div>
            <div className={styles.resume__editor_and_preview}>
                <div className={styles.resume__editor}>
                    <EditResumeNameDetails resume={resumeDetails}/>
                </div>
                <div className={styles.resume__preview}>
                    resume preview
                </div>
            </div>
        </div>
    );
}

export default EditResume;