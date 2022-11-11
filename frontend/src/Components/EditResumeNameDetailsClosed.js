import React from "react";
import styles from "./EditResumeNameDetailsClosed.module.css";

import editIconBlack from "../icons/edit_pencil_icon__black.png";
import defaultProfilePic from "../images/profile_pic.png";
import emailIcon from "../icons/email_icon.png";
import phoneIcon from "../icons/phone_icon.png";
import locationIcon from "../icons/location_icon.png";

const EditResumeNameDetails = ({ resume, setParentsEditStatus }) => {
  // console.log({ resume });
  return (
    <>
      <div className={styles.resume__editor_edit__name}>
        <div className={styles.name_and_editicon}>
          <div className={styles.name_and_job_title}>
            {/* <p className={styles.name}>Andrew Kim</p> */}
            <p className={styles.name}>
              {resume.fullName ? resume.fullName : "Full Name"}
            </p>
            {/* <p className={styles.jobtitle}>Financial Analyst</p> */}
            <p className={styles.jobtitle}>
              {resume.jobTitle ? resume.jobTitle : "Job Title"}
            </p>
          </div>
          <img
            src={editIconBlack}
            className={styles.editIcon}
            onClick={() =>
              setParentsEditStatus((prevState) => ({
                ...prevState,
                nameDetails: !prevState.nameDetails,
              }))
            }
          />
        </div>
        <div className={styles.email_details_and_profilepic}>
          <div className={styles.email_details}>
            <div className={styles.email}>
              <img src={emailIcon} className={styles.emailIcon} />
              {/* <p className={styles.emailData}>andrew.kim@gmail.com</p> */}
              <p className={styles.emailData}>
                {resume.emailID ? resume.emailID : "emailid@gmail.com"}
              </p>
            </div>
            <div className={styles.phoneNumber}>
              <img src={phoneIcon} className={styles.phoneIcon} />
              {/* <p className={styles.phoneData}>9123456789</p> */}
              <p className={styles.phoneData}>
                {resume.phoneNumber ? resume.phoneNumber : "+919876543210"}
              </p>
            </div>
            <div className={styles.location}>
              <img src={locationIcon} className={styles.locationIcon} />
              {/* <p className={styles.locationData}>London,UK</p> */}
              <p className={styles.locationData}>
                {resume.location ? resume.location : "location"}
              </p>
            </div>
          </div>
          {/* <img src={defaultProfilePic} className={styles.profilePic} /> */}
          <img src={resume.profilePic} className={styles.profilePic} />
        </div>
      </div>
    </>
  );
};

export default EditResumeNameDetails;
