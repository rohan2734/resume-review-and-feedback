import react, { useState } from "react";

import add_icon from "../../icons/add_icon.png";
import edit_pencil_icon__black from "../../icons/edit_pencil_icon__black.png";
import delete_icon_black from "../../icons/delete_icon_black.png";

import styles from "./EditResumeProfessionalExperienceOpen.module.css";

const EditResumeProfessionalExperienceOpen = ({
  resume,
  setParentsEditStatus,
}) => {
  const [professionalExperiences, setProfessionalExperiences] = useState([]);
  const [selectedProfessionalExperience, setSelectedProfessionalExperience] =
    useState({});
  return (
    <>
      <div className={styles.pe__container}>
        <h3 className={styles.pe__title}>Edit Professional Experience</h3>
        <div className={styles.pe_list_container}>
          <div className={styles.pe_card}>
            <div className={styles.title_and_details_container}>
              <h3>
                <span className={styles.job_title}>,</span>
              </h3>
              <p className={styles.start_and_end_date}></p> |{" "}
              <p className={styles.location}></p>
            </div>
            <div className={styles.delete_and_edit_icons_container}>
              <img src={edit_pencil_icon__black} className={styles.pe_icon} />
              <img src={delete_icon_black} className={styles.pe_icon} />
            </div>
          </div>
        </div>
        <div className={styles.button_container}>
          <button className={styles.add_pe_button}>
            <span>
              <img src={add_icon} className={styles.add_pe_button__add_icon} />
            </span>
            Professional Experience
          </button>
        </div>

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
      </div>
    </>
  );
};

export default EditResumeProfessionalExperienceOpen;
