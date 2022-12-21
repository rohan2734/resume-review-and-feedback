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
  return (
    <div className={styles.s__container}>
      <h3 className={styles.s__title}>Edit Skills</h3>
      {skillsCurrent?.map((skill) => (
        <EditResumeSkillsCard
          skill={skill}
          key={skill._id}
          setSelectedSkillParent={setSelectedSkill}
          setEditSkillCardStatusParent={setEditSkillCardStatus}
        />
      ))}
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
  );
};

export default EditResumeSkillsOpen;
