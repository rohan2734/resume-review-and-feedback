import react from "react";

import styles from "./EditResumeProfessionalExperienceCardOpen.module.css";

const EditResumeProfessionalExperienceCardOpen = ({
  selectedProfessionalExperience,
  setEditProfessionalExperienceCardStatus,
}) => {
  // const [professionalExperiences, setProfessionalExperiences] = useState(
  //   professionalExperiences || []
  // );
  console.log({ selectedProfessionalExperience });
  return (
    <div className={styles.pe_edit_container}>
      <form>
        <div className={styles.input_job_title_and_date_container}>
          <div className={styles.input_container}>
            <label className={styles.input_label}>Job Title</label>
            <input
              className={styles.input_item}
              // value={"Full Name"}

              // value={resumeNameDetails.fullName}
              // name="fullName"
              // type="text"
              // onChange={setInputHandler}
            />
          </div>
          <div className={styles.input_date_container}>
            <div className={styles.input_container}>
              <label className={styles.input_label}>Start Date</label>
              <input
                className={styles.input_item}
                // value={"Full Name"}

                // value={resumeNameDetails.fullName}
                // name="fullName"
                // type="text"
                // onChange={setInputHandler}
              />
            </div>
            <div className={styles.input_container}>
              <label className={styles.input_label}>End Date</label>
              <input
                className={styles.input_item}
                // value={"Full Name"}

                // value={resumeNameDetails.fullName}
                // name="fullName"
                // type="text"
                // onChange={setInputHandler}
              />
            </div>
          </div>
        </div>

        <div className={styles.input_employer_location}>
          <div className={styles.input_container}>
            <label className={styles.input_label}>Employer</label>
            <input
              className={styles.input_item}
              // value={"Full Name"}

              // value={resumeNameDetails.fullName}
              // name="fullName"
              // type="text"
              // onChange={setInputHandler}
            />
          </div>
          <div className={styles.input_container}>
            <label className={styles.input_label}>Location </label>
            <input
              className={styles.input_item}
              // value={"Full Name"}

              // value={resumeNameDetails.fullName}
              // name="fullName"
              // type="text"
              // onChange={setInputHandler}
            />
          </div>
        </div>

        <div className={styles.input_container}>
          <label className={styles.input_label}>Description</label>

          <textarea
            className={styles.input_item}
            // value={profileDescription}
            // name="profileDescription"
            rows="4"
            // onChange={(e) => setProfileDescription(e.target.value)}
            //   cols="500"
          />
        </div>
      </form>
    </div>
  );
};

export default EditResumeProfessionalExperienceCardOpen;
