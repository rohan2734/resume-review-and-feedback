import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import EditResumeSkillCard from "./EditResumeSkillCard";
import EditResumeSkillCardOpen from "./EditResumeSkillCardOpen";

import add_icon from "../../icons/add_icon.png";

import styles from "./EditResumeSkillOpen.module.css";

const EditResumeSkillsOpen = ({
  resume,
  skills,
  setParentsEditStatus,
  setParentsResumeDetails,
}) => {
  const [skillsCurrent, setSkillsCurrent] = useState(skills);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [editSkillCardStatus, setEditSkillCardStatus] = useState(false);

  var { resumeId } = useParams();

  useEffect(() => {
    setSkillsCurrent(skills);
  }, [skills]);

  // console.log({ skillsCurrent });
  // console.log({ resume, skills });
  // console.log({ selectedSkill });
  // console.log("entered");
  return (
    <div className={styles.pe__container}>
      <h3 className={styles.s__title}>Edit Skills</h3>

      {editSkillCardStatus && (
        <EditResumeSkillCardOpen
          selectedSkill={selectedSkill}
          setEditSkillCardStatusParent={setEditSkillCardStatus}
          setSkillsCurrentParent={setSkillsCurrent}
          setParentsResumeDetails={setParentsResumeDetails}
        />
      )}
      {!editSkillCardStatus && (
        <EditResumeSkillCard
          skillsCurrent={skillsCurrent}
          setSkillsCurrentParent={setSkillsCurrent}
          setSelectedSkillParent={setSelectedSkill}
          setEditSkillCardStatusParent={setEditSkillCardStatus}
          setParentsResumeDetails={setParentsResumeDetails}
        />
      )}

      {!editSkillCardStatus && (
        <div className={styles.button_container}>
          <button
            className={styles.add_pe_button}
            onClick={() => {
              setEditSkillCardStatus((prevState) => !prevState);
              setSelectedSkill(null);
            }}
          >
            <span>
              <img src={add_icon} className={styles.add_pe_button__add_icon} />
            </span>
            Skill
          </button>
        </div>
      )}

      <div className={styles.buttons}>
        <button
          className={styles.buttons_cancel}
          onClick={() =>
            setParentsEditStatus((prevState) => ({
              ...prevState,
              skills: !prevState.skills,
            }))
          }
        >
          close
        </button>
      </div>
    </div>
  );
};

export default EditResumeSkillsOpen;
