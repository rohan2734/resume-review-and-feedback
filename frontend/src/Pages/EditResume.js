import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import styles from "./EditResume.module.css";

import { BASE_URL } from "../Keys/Keys";

//resume edit card components
import EditResumeNameDetailsClosed from "../Components/EditResume/EditResumeNameDetailsClosed";
import EditResumeNameDetailsOpen from "../Components/EditResume/EditResumeNameDetailsOpen";
import EditResumeProfileOpen from "../Components/EditResume/EditResumeProfileOpen";
import ResumeEditCardClosed from "../Components/EditResume/ResumeEditCardClosed";
import EditResumeProfessionalExperienceOpen from "../Components/EditResume/EditResumeProfessionalExperienceOpen";
import EditResumeSkillOpen from "../Components/EditResume/EditResumeSkillOpen";
import EditResumeEducationOpen from "../Components/EditResume/EditResumeEducationOpen";

// icons
import profileIcon from "../icons/profile_icon.png";
import professionalExperienceIcon from "../icons/professional_experience_icon.png";
import skillsIcon from "../icons/skills_icon.png";
import educationIcon from "../icons/education_icon.png";
import projectsIcon from "../icons/projects_icon.png";
import awardsIcon from "../icons/awards_icon.png";
import interestsIcon from "../icons/interests_icon.png";
import certificatesIcon from "../icons/certificates_icon.png";
import languagesIcon from "../icons/languages_icon.png";

const EditResume = () => {
  const { resumeId } = useParams();

  const [resumeDetails, setResumeDetails] = useState({
    resumeName: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    gender: "",
    jobTitle: "",
    location: "",
    emailID: "",
    profilePic: "",
    profilePicURL: "",
    linkedinURL: "",
    githubURL: "",
    mediumURL: "",
    websiteURL: "",
    profileDescription: "",
    //embedded objects
    professionalExperiences: [],
    skills: [],
    education: [],
    projects: [],
    awards: [],
    certificates: [],
    languages: [],
    //belongs to user
    user: "",
  });

  const [editStatus, setEditStatus] = useState({
    nameDetails: false,
    professionalExperience: false,
    skills: false,
    education: false,
    projects: false,
    awards: false,
    certificates: false,
    languages: false,
  });

  useEffect(() => {
    var token = localStorage.getItem("token");

    const headers = {
      authorization: `Bearer ${token}`,
    };

    axios
      .get(`${BASE_URL}/api/resumes/get-resume/${resumeId}`, { headers })
      .then((res) => {
        setResumeDetails({
          ...resumeDetails,
          ...res.data.resume,
        });
        // console.log({ resume: res.data.resume });
      })
      .catch((err) => {
        // console.log(err);
      });

    // console.log({ resumeDetails });
  }, []);

  return (
    <div className={styles.container}>
      {/* {console.log({ resumeDetails })} */}
      <div className={styles.resume__name}>{resumeDetails?.resumeName}</div>
      <div className={styles.resume__editor_and_preview}>
        <div className={styles.resume__editor}>
          {!editStatus.nameDetails ? (
            <EditResumeNameDetailsClosed
              resume={resumeDetails}
              setParentsEditStatus={setEditStatus}
            />
          ) : (
            <EditResumeNameDetailsOpen
              resume={resumeDetails}
              setParentsEditStatus={setEditStatus}
              setParentsResumeDetails={setResumeDetails}
            />
          )}

          {/* edit profile */}
          {!editStatus.profileDescription ? (
            <ResumeEditCardClosed
              title="Profile"
              cardIcon={profileIcon}
              setParentsEditStatus={setEditStatus}
              editStatusKey="profileDescription"
            />
          ) : (
            <EditResumeProfileOpen
              resume={resumeDetails}
              setParentsEditStatus={setEditStatus}
              setParentsResumeDetails={setResumeDetails}
            />
          )}

          {/* edit professional experience */}
          {!editStatus.professionalExperiences ? (
            <ResumeEditCardClosed
              title="Professional Experience"
              cardIcon={professionalExperienceIcon}
              setParentsEditStatus={setEditStatus}
              editStatusKey="professionalExperiences"
            />
          ) : (
            <EditResumeProfessionalExperienceOpen
              resume={resumeDetails}
              professionalExperiences={resumeDetails.professionalExperiences}
              setParentsEditStatus={setEditStatus}
              setParentsResumeDetails={setResumeDetails}
            />
          )}

          {/* edit skills */}
          {!editStatus.skills ? (
            <ResumeEditCardClosed
              title="Skills"
              cardIcon={skillsIcon}
              setParentsEditStatus={setEditStatus}
              editStatusKey="skills"
            />
          ) : (
            <EditResumeSkillOpen
              resume={resumeDetails}
              skills={resumeDetails.skills}
              setParentsEditStatus={setEditStatus}
              setParentsResumeDetails={setResumeDetails}
            />
          )}

          {/* edit education */}
          {/* <ResumeEditCardClosed title="Education" cardIcon={educationIcon} /> */}
          {/* <div className={styles.resume__edit_card}>
                        <img src={educationIcon} className={styles.resume__edit_card_icon}/>
                        <h3 className={styles.resume__edit_card_title}>Education</h3>
                        <img  className={styles.resume__edit_card_dropdown} src={editResumeDropdown} />
                    </div> */}

          {!editStatus.education ? (
            <ResumeEditCardClosed
              title="Education"
              cardIcon={educationIcon}
              setParentsEditStatus={setEditStatus}
              editStatusKey="education"
            />
          ) : (
            <EditResumeEducationOpen
              resume={resumeDetails}
              education={resumeDetails.education}
              setParentsEditStatus={setEditStatus}
              setParentsResumeDetails={setResumeDetails}
            />
          )}

          {/* edit projects */}
          <ResumeEditCardClosed title="Projects" cardIcon={projectsIcon} />
          {/* <div className={styles.resume__edit_card}>
                        <img src={projectsIcon} className={styles.resume__edit_card_icon}/>
                        <h3 className={styles.resume__edit_card_title}>Projects</h3>
                        <img  className={styles.resume__edit_card_dropdown} src={editResumeDropdown} />
                    </div> */}

          {/* edit awards */}
          <ResumeEditCardClosed title="Awards" cardIcon={awardsIcon} />
          {/* <div className={styles.resume__edit_card}>
                        <img src={awardsIcon} className={styles.resume__edit_card_icon}/>
                        <h3 className={styles.resume__edit_card_title}>Awards</h3>
                        <img  className={styles.resume__edit_card_dropdown} src={editResumeDropdown} />
                    </div> */}

          {/* edit interests */}
          <ResumeEditCardClosed title="Interests" cardIcon={interestsIcon} />
          {/* <div className={styles.resume__edit_card}>
                        <img src={interestsIcon} className={styles.resume__edit_card_icon}/>
                        <h3 className={styles.resume__edit_card_title}>Interests</h3>
                        <img  className={styles.resume__edit_card_dropdown} src={editResumeDropdown} />
                    </div> */}

          {/* edit certificates */}
          <ResumeEditCardClosed
            title="Certificates"
            cardIcon={certificatesIcon}
          />
          {/* <div className={styles.resume__edit_card}>
                        <img src={certificatesIcon} className={styles.resume__edit_card_icon}/>
                        <h3 className={styles.resume__edit_card_title}>Certificates</h3>
                        <img  className={styles.resume__edit_card_dropdown} src={editResumeDropdown} />
                    </div> */}

          {/* edit languages */}
          <ResumeEditCardClosed title="Languages" cardIcon={languagesIcon} />
          {/* <div className={styles.resume__edit_card}>
                        <img src={languagesIcon} className={styles.resume__edit_card_icon}/>
                        <h3 className={styles.resume__edit_card_title}>Languages</h3>
                        <img  className={styles.resume__edit_card_dropdown} src={editResumeDropdown} />
                    </div> */}
        </div>
        <div className={styles.resume__preview}>resume preview</div>
      </div>
    </div>
  );
};

export default EditResume;
