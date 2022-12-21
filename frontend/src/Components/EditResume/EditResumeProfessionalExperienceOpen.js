import react, { useState } from "react";

import EditResumeProfessionalExperienceCardOpen from "./EditResumeProfessionalExperienceCardOpen";
import EditProfessionalExperienceCard from "./EditResumeProfessionalExperienceCard";

import add_icon from "../../icons/add_icon.png";

import styles from "./EditResumeProfessionalExperienceOpen.module.css";

const EditResumeProfessionalExperienceOpen = ({
  resume,
  professionalExperiences,
  setParentsEditStatus,
  setParentsResumeDetails,
}) => {
  const [professionalExperiencesCurrent, setProfessionalExperiencesCurrent] =
    useState(professionalExperiences);
  const [selectedProfessionalExperience, setSelectedProfessionalExperience] =
    useState(null);
  const [
    editProfessionalExperienceCardStatus,
    setEditProfessionalExperienceCardStatus,
  ] = useState(false);
  const [
    addProfessionalExperienceCardStatus,
    setAddProfessionalExperienceCardStatus,
  ] = useState(false);

  return (
    <>
      <div className={styles.pe__container}>
        <h3 className={styles.pe__title}>Edit Professional Experience</h3>
        {/* edit professional experience card open */}
        {editProfessionalExperienceCardStatus && (
          <EditResumeProfessionalExperienceCardOpen
            selectedProfessionalExperience={selectedProfessionalExperience}
            setEditProfessionalExperienceCardStatusParent={
              setEditProfessionalExperienceCardStatus
            }
            setProfessionalExperiencesCurrentParent={
              setProfessionalExperiencesCurrent
            }
            setParentsResumeDetails={setParentsResumeDetails}
          />
        )}
        {/* professional experience card list */}
        {!editProfessionalExperienceCardStatus && (
          <EditProfessionalExperienceCard
            professionalExperiencesCurrent={professionalExperiencesCurrent}
            setSelectedProfessionalExperienceParent={
              setSelectedProfessionalExperience
            }
            setEditProfessionalExperienceCardStatusParent={
              setEditProfessionalExperienceCardStatus
            }
            setProfessionalExperiencesCurrentParent={
              setProfessionalExperiencesCurrent
            }
            setParentsResumeDetails={setParentsResumeDetails}
          />
        )}

        {!editProfessionalExperienceCardStatus && (
          <div className={styles.button_container}>
            <button
              className={styles.add_pe_button}
              onClick={() => {
                setEditProfessionalExperienceCardStatus(
                  (prevState) => !prevState
                );
                setSelectedProfessionalExperience(null);
              }}
            >
              <span>
                <img
                  src={add_icon}
                  className={styles.add_pe_button__add_icon}
                />
              </span>
              Professional Experience
            </button>
          </div>
        )}

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
        </div>
      </div>
    </>
  );
};

export default EditResumeProfessionalExperienceOpen;
