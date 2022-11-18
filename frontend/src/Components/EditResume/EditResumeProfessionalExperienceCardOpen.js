import react, { useState } from "react";

import styles from "./EditResumeProfessionalExperienceCardOpen.module.css";

const EditResumeProfessionalExperienceCardOpen = ({
  selectedProfessionalExperience,
  setEditProfessionalExperienceCardStatusParent,
}) => {
  console.log({ selectedProfessionalExperience });
  const [professionalExperience, setProfessionalExperience] = useState(
    selectedProfessionalExperience
  );

  const setInputHandler = (e) => {
    setProfessionalExperience({
      ...professionalExperience,
      [e.target.name]: e.target.value,
    });
  };

  console.log({ professionalExperience });
  return (
    <div className={styles.pe_edit_container}>
      <form>
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
