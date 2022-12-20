import react, { useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { BASE_URL } from "../../Keys/Keys";

import styles from "./EditResumeProfessionalExperienceCardOpen.module.css";

const EditResumeProfessionalExperienceCardOpen = ({
  selectedProfessionalExperience,
  setEditProfessionalExperienceCardStatusParent,
  setProfessionalExperiencesCurrentParent,
  setParentsResumeDetails,
}) => {
  const [professionalExperience, setProfessionalExperience] = useState(
    selectedProfessionalExperience
  );

  const setInputHandler = (e) => {
    setProfessionalExperience({
      ...professionalExperience,
      [e.target.name]: e.target.value,
    });
  };

  var { resumeId } = useParams();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    var token = localStorage.getItem("token");

    var headers = {
      authorization: `Bearer ${token}`,
    };

    if (selectedProfessionalExperience == null) {
      axios({
        method: "PATCH",
        url: `${BASE_URL}/api/resumes/edit-resume-add-professional-experience`,
        data: { ...professionalExperience, resumeId: resumeId },
        headers,
      })
        .then((res) => {
          console.log({ resp: res.data });

          if (res.data.status == 200) {
            setEditProfessionalExperienceCardStatusParent(
              (prevState) => !prevState
            );
            setProfessionalExperiencesCurrentParent(
              res.data.resume.professionalExperiences
            );
            setParentsResumeDetails((prevState) => ({
              ...prevState,
              professionalExperiences: res.data.resume.professionalExperiences,
            }));
          }
        })
        .catch((err) => console.log(err));
    } else {
      //patch request api
    }

    // axios.patch()
  };

  return (
    <div className={styles.pe_edit_container}>
      <form onSubmit={formSubmitHandler}>
        <div className={styles.input_job_title_and_date_container}>
          <div className={styles.input_container}>
            <label className={styles.input_label}>Job Title</label>
            <input
              className={styles.input_item}
              // value={"Full Name"}
              value={professionalExperience?.jobTitle}
              name="jobTitle"
              type="text"
              onChange={setInputHandler}
            />
          </div>
          <div className={styles.input_date_container}>
            <div className={styles.input_container}>
              <label className={styles.input_label}>Start Date</label>
              <input
                className={styles.input_item}
                value={professionalExperience?.startDate}
                name="startDate"
                type="date"
                onChange={setInputHandler}
              />
            </div>
            <div className={styles.input_container}>
              <label className={styles.input_label}>End Date</label>
              <input
                className={styles.input_item}
                value={professionalExperience?.endDate}
                name="endDate"
                type="date"
                onChange={setInputHandler}
              />
            </div>
          </div>
        </div>

        <div className={styles.input_employer_location}>
          <div className={styles.input_container}>
            <label className={styles.input_label}>Employer</label>
            <input
              className={styles.input_item}
              value={professionalExperience?.employer}
              name="employer"
              type="text"
              onChange={setInputHandler}
            />
          </div>
          <div className={styles.input_container}>
            <label className={styles.input_label}>Location </label>
            <input
              className={styles.input_item}
              value={professionalExperience?.location}
              name="location"
              type="text"
              onChange={setInputHandler}
            />
          </div>
        </div>

        <div className={styles.input_container}>
          <label className={styles.input_label}>Description</label>

          <textarea
            className={styles.input_item}
            value={professionalExperience?.description}
            name="description"
            type="text"
            onChange={setInputHandler}
          />
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.buttons_cancel}
            onClick={() => {
              setEditProfessionalExperienceCardStatusParent(
                (prevState) => !prevState
              );
            }}
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

export default EditResumeProfessionalExperienceCardOpen;
