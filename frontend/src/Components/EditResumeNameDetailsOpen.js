import React, { useState } from "react";
import styles from "./EditResumeNameDetailsOpen.module.css";

import defaultProfilePic from "../images/profile_pic.png";
import editPencilIconBlack from "../icons/edit_pencil_icon__black.png";
import axios from "axios";
import { BASE_URL } from "../Keys/Keys";
import { useParams } from "react-router-dom";

const EditResumeNameOpen = ({
  resume,
  setParentsEditStatus,
  setParentsResumeDetails,
}) => {
  // setParentsResumeDetails={setResumeDetails}
  const [resumeNameDetails, setResumeNameDetails] = useState({
    // profilePic: resume.profilePicURL ? resume.profilePicURL : "",
    profilePic: "",
    profilePicURL: resume.profilePicURL ? resume.profilePicURL : "",
    fullName: resume.fullName ? resume.fullName : "",
    address: resume.address ? resume.address : "",
    gender: resume.gender ? resume.gender : "",
    jobTitle: resume.jobTitle ? resume.jobTitle : "",
    location: resume.location ? resume.location : "",
    emailID: resume.emailID ? resume.emailID : "",
    phoneNumber: resume.phoneNumber ? resume.phoneNumber : "",
    linkedinURL: resume.linkedinURL ? resume.linkedinURL : "",
    mediumURL: resume.mediumURL ? resume.mediumURL : "",
    githubURL: resume.githubURL ? resume.githubURL : "",
    websiteURL: resume.websiteURL ? resume.websiteURL : "",
  });
  // console.log({ resume });

  const setInputHandler = (e) => {
    e.preventDefault();

    if (e.target.name == "profilePic") {
      setResumeNameDetails({
        ...resumeNameDetails,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setResumeNameDetails({
        ...resumeNameDetails,
        [e.target.name]: e.target.value,
      });
    }

    // console.log({ resumeNameDetails });
  };
  var { resumeId } = useParams();
  const formSubmitHandler = (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("profilePic", resumeNameDetails.profilePic);
    formData.append("fullName", resumeNameDetails.fullName);
    formData.append("address", resumeNameDetails.address);
    formData.append("gender", resumeNameDetails.gender);
    formData.append("jobTitle", resumeNameDetails.jobTitle);
    formData.append("location", resumeNameDetails.location);
    formData.append("emailID", resumeNameDetails.emailID);
    formData.append("phoneNumber", resumeNameDetails.phoneNumber);
    formData.append("linkedinURL", resumeNameDetails.linkedinURL);
    formData.append("mediumURL", resumeNameDetails.mediumURL);
    formData.append("websiteURL", resumeNameDetails.websiteURL);
    // console.log({ profilePic: resumeNameDetails.profilePic });
    if (resumeNameDetails.profilePic.length == 0) {
      formData.append("profilePicURL", resumeNameDetails.profilePicURL);
    }

    var token = localStorage.getItem("token");

    var headers = {
      authorization: `Bearer ${token}`,
    };
    // console.log({ formData });

    // for (let [key, value] of formData) {
    //   console.log(`${key}:${value}`);
    // }
    // https://stackoverflow.com/questions/17066875/how-to-inspect-formdata
    // axios
    //   .patch(
    //     `${BASE_URL}/api/resumes/edit-resume-by-person`,
    //     {
    //       // data: { ...formData },
    //       data: formData,
    //     },
    //     {
    //       headers,
    //     }
    //   )
    //   .then((res) => console.log({ res }))
    //   .catch((err) => console.log(err));

    formData.append("resumeId", resumeId);
    axios({
      method: "PATCH",
      url: `${BASE_URL}/api/resumes/edit-resume-name-details`,
      data: formData,
      headers: headers,
    })
      .then((res) => {
        console.log({ res });
        if (res.data.status == 200) {
          setParentsEditStatus((prevState) => ({
            ...prevState,
            nameDetails: !prevState.nameDetails,
          }));

          setParentsResumeDetails((prevState) => ({
            ...prevState,
            ...resumeNameDetails,
          }));
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className={styles.edit_namedetails__container}>
        <h3 className={styles.namedetails_title}>Edit Person</h3>
        <form onSubmit={formSubmitHandler}>
          <div className={styles.name_details_container}>
            <div className={styles.inputs_with_edit_image}>
              <div className={styles.inputs}>
                {/* <form onSubmit={}>

              </form> */}

                <div className={styles.input_container}>
                  <label className={styles.input_label}>Full Name</label>
                  <input
                    className={styles.input_item}
                    // value={"Full Name"}
                    // value={resume.fullName}
                    value={resumeNameDetails.fullName}
                    name="fullName"
                    type="text"
                    onChange={setInputHandler}
                  />
                </div>
                <div className={styles.input_container}>
                  <label className={styles.input_label}>Address</label>
                  <input
                    className={styles.input_item}
                    // value={"Address"}
                    // value={resume.address}
                    value={resumeNameDetails.address}
                    name="address"
                    type="text"
                    onChange={setInputHandler}
                  />
                </div>
                <div className={styles.input_container}>
                  <label className={styles.input_label}>Gender</label>
                  <input
                    className={styles.input_item}
                    // value={"Gender"}
                    // value={resume.gender}
                    value={resumeNameDetails.gender}
                    name="gender"
                    type="text"
                    onChange={setInputHandler}
                  />
                </div>
              </div>
              <div className={styles.edit_image_container}>
                <img
                  // src={defaultProfilePic}
                  src={
                    // resume.profilePicURL
                    //   ? resume.profilePicURL
                    //   : defaultProfilePic
                    resumeNameDetails.profilePicURL
                      ? resumeNameDetails.profilePicURL
                      : resumeNameDetails.profilePic
                  }
                  className={styles.namedetails_image}
                />
                {/* <label for="profilePic">
                  <img
                    src={editPencilIconBlack}
                    className={styles.edit_image_icon}
                  />
                </label> */}
                {/* <input type="file" id="firstimage" style="display:none;" /> */}
                <input
                  type="file"
                  id="profilePic"
                  // className={styles.edit_image_input}
                  name="profilePic"
                  onChange={setInputHandler}
                />

                <div className={styles.input_container}>
                  <label className={styles.input_label}>Job Title </label>
                  <input
                    className={styles.input_item}
                    // value={"Job Title"}
                    // value={resume.jobTitle}
                    value={resumeNameDetails.jobTitle}
                    name="jobTitle"
                    type="text"
                    onChange={setInputHandler}
                  />
                </div>
              </div>
            </div>
            <div className={styles.inputs_remaining}>
              <div className={styles.input_container}>
                <label className={styles.input_label}>Email</label>
                <input
                  className={styles.input_item}
                  // value={"email@gmail.com"}
                  // value={resume.emailID}
                  value={resumeNameDetails.emailID}
                  type="text"
                  name="emailID"
                  onChange={setInputHandler}
                />
              </div>
              <div className={styles.input_container}>
                <label className={styles.input_label}>Phone Number</label>
                <input
                  className={styles.input_item}
                  // value={"9876543210"}
                  // value={resume.phoneNumber}
                  value={resumeNameDetails.phoneNumber}
                  type="text"
                  name="phoneNumber"
                  onChange={setInputHandler}
                />
              </div>
            </div>
            <div className={styles.input_container}>
              <label className={styles.input_label}>location</label>
              <input
                className={styles.input_item}
                // value={"9876543210"}
                // value={resume.location}
                value={resumeNameDetails.location}
                type="text"
                name="location"
                onChange={setInputHandler}
              />
            </div>
          </div>
          {/* links */}
          <div className={styles.links_container}>
            <h3 className={styles.namedetails_subtitle}>Links</h3>
            <div className={styles.links_subcontainer}>
              <div>
                <div className={styles.input_container}>
                  <label className={styles.input_label}>linkedin</label>
                  <input
                    className={styles.input_item}
                    // value={"https://linkedin.com/in/adrewkim"}
                    // value={resume.linkedinURL}
                    value={resumeNameDetails.linkedinURL}
                    name="linkedinURL"
                    type="text"
                    onChange={setInputHandler}
                  />
                </div>
                <div className={styles.input_container}>
                  <label className={styles.input_label}>Medium</label>
                  <input
                    className={styles.input_item}
                    // value={"https://medium.com/@andrewkim"}
                    // value={resume.mediumURL}
                    value={resumeNameDetails.mediumURL}
                    name="mediumURL"
                    type="text"
                    onChange={setInputHandler}
                  />
                </div>
              </div>
              <div>
                <div className={styles.input_container}>
                  <label className={styles.input_label}>Github</label>
                  <input
                    className={styles.input_item}
                    // value={"https://github.com/andrewkim"}
                    // value={resume.githubURL}
                    value={resumeNameDetails.githubURL}
                    name="githubURL"
                    type="text"
                    onChange={setInputHandler}
                  />
                </div>
                <div className={styles.input_container}>
                  <label className={styles.input_label}>website</label>
                  <input
                    className={styles.input_item}
                    // value={"https://andrewkim.uk"}
                    // value={resume.websiteURL}
                    value={resumeNameDetails.websiteURL}
                    name="websiteURL"
                    type="text"
                    onChange={setInputHandler}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* buttons */}
          <div className={styles.buttons}>
            <button
              className={styles.buttons_cancel}
              onClick={() =>
                setParentsEditStatus((prevState) => ({
                  ...prevState,
                  nameDetails: !prevState.nameDetails,
                }))
              }
            >
              cancel
            </button>
            <button className={styles.buttons_save} type="submit">
              save
            </button>
          </div>
        </form>
        {/* </form> */}
      </div>
    </>
  );
};

export default EditResumeNameOpen;
