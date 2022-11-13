import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { BASE_URL } from "../../Keys/Keys";

import styles from "./EditResumeProfileOpen.module.css";

import axios from "axios";

const EditResumeProfileOpen = ({
  resume,
  setParentsEditStatus,
  setParentsResumeDetails,
}) => {
  const [profileDescription, setProfileDescription] = useState(
    resume.profileDescription ? resume.profileDescription : ""
  );
  var { resumeId } = useParams();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    var token = localStorage.getItem("token");

    var headers = {
      authorization: `Bearer ${token}`,
    };
    // console.log({ profileDescription });
    axios({
      method: "PATCH",
      url: `${BASE_URL}/api/resumes/edit-resume-profile-description`,
      data: { profileDescription: profileDescription, resumeId: resumeId },
      headers,
    })
      .then((res) => {
        console.log({ resp: res.data });

        if (res.data.status == 200) {
          setParentsEditStatus((prevState) => ({
            ...prevState,
            profileDescription: !prevState.profileDescription,
          }));
          //   setProfileDescription(res.data.updatedResume.profileDescription);

          setParentsResumeDetails((prevState) => ({
            ...prevState,
            profileDescription: res.data.updatedResume.profileDescription,
          }));
        }
      })
      .catch((err) => console.log(err));

    // axios.patch()
  };

  return (
    <div className={styles.edit_profile__container}>
      <h3 className={styles.edit_profile__title}>Edit Profile</h3>
      <form onSubmit={formSubmitHandler}>
        <div className={styles.input_container}>
          <label className={styles.input_label}>Profile Description</label>
          {/* <input
                            className={styles.input_item}
                            // value={"Full Name"}
                            // value={resume.fullName}
                            value={resumeNameDetails.fullName}
                            name="fullName"
                            type="text"
                            onChange={setInputHandler}
                        /> */}

          <textarea
            className={styles.input_item}
            value={profileDescription}
            name="profileDescription"
            rows="4"
            onChange={(e) => setProfileDescription(e.target.value)}
            //   cols="500"
          />
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.buttons_cancel}
            onClick={() =>
              setParentsEditStatus((prevState) => ({
                ...prevState,
                profileDescription: !prevState.profileDescription,
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
    </div>
  );
};
export default EditResumeProfileOpen;
