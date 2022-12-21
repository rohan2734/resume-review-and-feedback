import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditResumeSkillsCard from "./EditResumeSkillsCard";
import styles from "./EditResumeSkillsOpen.module.css";

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
  return (
    <div className={styles.s__container}>
      <h3 className={styles.s__title}>Edit Skills</h3>
      {/* {editSkillCardStatus && (

      )

      } */}
      {!editSkillCardStatus && (
        <EditResumeSkillsCard
          skillsCurrent={skillsCurrent}
          setSkillsCurrentParent={setSkillsCurrent}
          setSelectedSkillParent={setSelectedSkill}
          setEditSkillCardStatusParent={setEditSkillCardStatus}
          setParentsResumeDetails={setParentsResumeDetails}
        />
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
