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

import editResumeDropdown from "../icons/edit_resume_dropdown.png";
import profileIcon from "../icons/profile_icon.png";
import professionalExperienceIcon from "../icons/professional_experience_icon.png";
import skillsIcon from "../icons/skills_icon.png";
import educationIcon from "../icons/education_icon.png";
import projectsIcon from "../icons/projects_icon.png";
import awardsIcon from "../icons/awards_icon.png";
import interestsIcon from "../icons/interests_icon.png";
import certificatesIcon from "../icons/certificates_icon.png";
import languagesIcon from "../icons/languages_icon.png";


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
                     {/* edit profile */}
                    <div className={styles.resume__edit_card}>
                        <img src={profileIcon} className={styles.resume__edit_card_icon}/>
                        <h3 className={styles.resume__edit_card_title}>Profile</h3>
                        <img  className={styles.resume__edit_card_dropdown} src={editResumeDropdown} />
                    </div>

                     {/* edit professional experience */}
                     <div className={styles.resume__edit_card}>
                        <img src={professionalExperienceIcon} className={styles.resume__edit_card_icon}/>
                        <h3 className={styles.resume__edit_card_title}>Professional Experience</h3>
                        <img  className={styles.resume__edit_card_dropdown} src={editResumeDropdown} />
                    </div>

                      {/* edit skills */}
                      <div className={styles.resume__edit_card}>
                        <img src={skillsIcon} className={styles.resume__edit_card_icon}/>
                        <h3 className={styles.resume__edit_card_title}>Skils</h3>
                        <img  className={styles.resume__edit_card_dropdown} src={editResumeDropdown} />
                    </div>

                     {/* edit education */}
                     <div className={styles.resume__edit_card}>
                        <img src={educationIcon} className={styles.resume__edit_card_icon}/>
                        <h3 className={styles.resume__edit_card_title}>Education</h3>
                        <img  className={styles.resume__edit_card_dropdown} src={editResumeDropdown} />
                    </div>

                     {/* edit awards */}
                     <div className={styles.resume__edit_card}>
                        <img src={awardsIcon} className={styles.resume__edit_card_icon}/>
                        <h3 className={styles.resume__edit_card_title}>Awards</h3>
                        <img  className={styles.resume__edit_card_dropdown} src={editResumeDropdown} />
                    </div>

                     {/* edit interests */}
                     <div className={styles.resume__edit_card}>
                        <img src={interestsIcon} className={styles.resume__edit_card_icon}/>
                        <h3 className={styles.resume__edit_card_title}>Interests</h3>
                        <img  className={styles.resume__edit_card_dropdown} src={editResumeDropdown} />
                    </div>

                     {/* edit certificates */}
                     <div className={styles.resume__edit_card}>
                        <img src={certificatesIcon} className={styles.resume__edit_card_icon}/>
                        <h3 className={styles.resume__edit_card_title}>Certificates</h3>
                        <img  className={styles.resume__edit_card_dropdown} src={editResumeDropdown} />
                    </div>

                     {/* edit languages */}
                     <div className={styles.resume__edit_card}>
                        <img src={languagesIcon} className={styles.resume__edit_card_icon}/>
                        <h3 className={styles.resume__edit_card_title}>Languages</h3>
                        <img  className={styles.resume__edit_card_dropdown} src={editResumeDropdown} />
                    </div>

                </div>
                <div className={styles.resume__preview}>
                    resume preview
                </div>
            </div>
           
        </div>
    );
}

export default EditResume;