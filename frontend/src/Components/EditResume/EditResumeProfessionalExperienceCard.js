import react from "react";

const EditProfessionalExperienceCard = ({ professionalExperiences }) => {
  return (
    <div className={styles.pe_list_container}>
      {professionalExperiences.map((professionalExperience) => (
        <div
          className={styles.pe_card}
          onClick={() => selectedProfessionalExperience(professionalExperience)}
        >
          <div className={styles.title_and_details_container}>
            <h3 className={styles.job_and_company}>
              {/* <span className={styles.job_title}>Software Developer,</span>
                  <span className={styles.company}>Fryction Inc </span> */}
              <span className={styles.job_title}>
                {professionalExperience.jobTitle}
              </span>
              <span className={styles.company}>
                {professionalExperience.company}
              </span>
            </h3>
            <p className={styles.date_and_location}>
              {/* <span className={styles.start_and_end}>
                    2018-03-01 -- 2018-10-01
                  </span>
                  <span className={styles.location}> | France , UK </span> */}
              <span className={styles.start_and_end}>
                {professionalExperience.startDate} --{" "}
                {professionalExperience.endDate}
              </span>
              <span className={styles.location}>
                {" "}
                | {professionalExperience.location}
              </span>
            </p>
          </div>
          <div className={styles.delete_and_edit_icons_container}>
            <img src={edit_pencil_icon__black} className={styles.pe_icon} />
            <img src={delete_icon_black} className={styles.pe_icon} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditProfessionalExperienceCard;
