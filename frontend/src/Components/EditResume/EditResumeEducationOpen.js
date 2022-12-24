import react, { useEffect, useState } from "react";

import EditResumeEducationCardOpen from "./EditResumeEducationCardOpen";
import EditResumeEducationCard from "./EditResumeEducationCard";

import add_icon from "../../icons/add_icon.png";

import styles from "./EditResumeEducationOpen.module.css";

const EditResumeEducationOpen = ({
  resume,
  education,
  setParentsEditStatus,
  setParentsResumeDetails,
}) => {
  const [educationCurrent, setEducationCurrent] = useState(education);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [editEducationCardStatus, setEditEducationCardStatus] = useState(false);

  // console.log({ educationCurrent });
  useEffect(() => {
    setEducationCurrent(education);
  }, [education]);

  return (
    <>
      <div className={styles.pe__container}>
        <h3 className={styles.pe__title}>Edit Education </h3>
        {/* edit professional experience card open */}
        {editEducationCardStatus && (
          <EditResumeEducationCardOpen
            selectedEducation={selectedEducation}
            setEditEducationCardStatusParent={setEditEducationCardStatus}
            setEducationCurrentParent={setEducationCurrent}
            setParentsResumeDetails={setParentsResumeDetails}
          />
        )}
        {/* professional experience card list */}
        {!editEducationCardStatus && (
          <EditResumeEducationCard
            educationCurrent={educationCurrent}
            setSelectedEducationParent={setSelectedEducation}
            setEditEducationCardStatusParent={setEditEducationCardStatus}
            setEducationCurrentParent={setEducationCurrent}
            setParentsResumeDetails={setParentsResumeDetails}
          />
        )}

        {!editEducationCardStatus && (
          <div className={styles.button_container}>
            <button
              className={styles.add_pe_button}
              onClick={() => {
                setEditEducationCardStatus((prevState) => !prevState);
                setSelectedEducation(null);
              }}
            >
              <span>
                <img
                  src={add_icon}
                  className={styles.add_pe_button__add_icon}
                />
              </span>
              Education
            </button>
          </div>
        )}

        <div className={styles.buttons}>
          <button
            className={styles.buttons_cancel}
            onClick={() =>
              setParentsEditStatus((prevState) => ({
                ...prevState,
                education: !prevState.education,
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

export default EditResumeEducationOpen;
