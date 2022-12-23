import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import EditResumeEducationCard from "./EditResumeEducationCard";
import EditResumeEducationCardOpen from "./EditResumeEducationCardOpen";

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

  var { resumeId } = useParams();

  useEffect(() => {
    setEducationCurrent(education);
  }, [education]);

  // console.log({ skillsCurrent });
  // console.log({ resume, skills });
  // console.log({ selectedSkill });
  return (
    <div className={styles.pe__container}>
      <h3 className={styles.s__title}>Edit Education</h3>

      {editEducationCardStatus && (
        <EditResumeEducationCardOpen
          selectedEducation={selectedEducation}
          setEditEducationCardStatusParent={setEditEducationCardStatus}
          setEducationCurrentParent={setEducationCurrent}
          setParentsResumeDetails={setParentsResumeDetails}
        />
      )}
      {!editEducationCardStatus && (
        <EditResumeEducationCard
          educationCurrent={educationCurrent}
          setEducationCurrentParent={setEducationCurrent}
          setSelectedEducationParent={setSelectedEducation}
          setEditEducationCardStatusParent={setEditEducationCardStatus}
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
              <img src={add_icon} className={styles.add_pe_button__add_icon} />
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
  );
};

export default EditResumeEducationOpen;
