import react, { useState } from "react";

import EditResumeProfessionalExperienceCardOpen from "./EditResumeProfessionalExperienceCardOpen";
import EditProfessionalExperienceCard from "./EditResumeProfessionalExperienceCard";

import add_icon from "../../icons/add_icon.png";
// import edit_pencil_icon__black from "../../icons/edit_pencil_icon__black.png";
// import delete_icon_black from "../../icons/delete_icon_black.png";

import styles from "./EditResumeProfessionalExperienceOpen.module.css";

const EditResumeProfessionalExperienceOpen = ({
  resume,
  professionalExperiences,
  setParentsEditStatus,
}) => {
  // const [professionalExperiences, setProfessionalExperiences] = useState(
  //   resume.professionalExperiences
  // );
  const [selectedProfessionalExperience, setSelectedProfessionalExperience] =
    useState({});
  const [
    editProfessionalExperienceCardStatus,
    setEditProfessionalExperienceCardStatus,
  ] = useState(false);
  console.log({ professionalExperiences });
  console.log({ selectedProfessionalExperience });
  // console.log({ resume });
  return (
    <>
      <div className={styles.pe__container}>
        <h3 className={styles.pe__title}>Edit Professional Experience</h3>

        {editProfessionalExperienceCardStatus && (
          <EditResumeProfessionalExperienceCardOpen
            selectedProfessionalExperience={selectedProfessionalExperience}
            setEditProfessionalExperienceCardStatus
          />
        )}

        {!editProfessionalExperienceCardStatus && (
          <EditProfessionalExperienceCard
            professionalExperiences={professionalExperiences}
            setSelectedProfessionalExperienceParent={
              setSelectedProfessionalExperience
            }
            setEditProfessionalExperienceCardStatusParent={
              setEditProfessionalExperienceCardStatus
            }
          />
        )}
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
                professionalExperiences: !prevState.professionalExperiences,
              }))
            }
          >
            close
          </button>
          {/* <button className={styles.buttons_save} type="submit">
            save
          </button> */}
        </div>
      </div>
    </>
  );
};

export default EditResumeProfessionalExperienceOpen;
