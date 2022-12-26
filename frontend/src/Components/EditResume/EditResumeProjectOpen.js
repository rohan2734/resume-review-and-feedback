import react, { useState } from "react";

import EditResumeProjectCardOpen from "./EditResumeProjectCardOpen";
import EditResumeProjectCard from "./EditResumeProjectCard";

import add_icon from "../../icons/add_icon.png";

import styles from "./EditResumeProjectOpen.module.css";

const EditResumeProjectOpen = ({
  resume,
  projects,
  setParentsEditStatus,
  setParentsResumeDetails,
}) => {
  const [projectsCurrent, setProjectsCurrent] = useState(projects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editProjectCardStatus, setEditProjectCardStatus] = useState(false);

  console.log({ projectsCurrent });

  return (
    <>
      <div className={styles.pe__container}>
        <h3 className={styles.pe__title}>Edit Project </h3>
        {/* edit professional experience card open */}
        {editProjectCardStatus && (
          <EditResumeProjectCardOpen
            selectedProject={selectedProject}
            setEditProjectCardStatusParent={setEditProjectCardStatus}
            setProjectsCurrentParent={setProjectsCurrent}
            setParentsResumeDetails={setParentsResumeDetails}
          />
        )}
        {/* professional experience card list */}
        {!editProjectCardStatus && (
          <EditResumeProjectCard
            projectsCurrent={projectsCurrent}
            setSelectedProjectParent={setSelectedProject}
            setEditProjectCardStatusParent={setEditProjectCardStatus}
            setProjectsCurrentParent={setProjectsCurrent}
            setParentsResumeDetails={setParentsResumeDetails}
          />
        )}

        {!editProjectCardStatus && (
          <div className={styles.button_container}>
            <button
              className={styles.add_pe_button}
              onClick={() => {
                setEditProjectCardStatus((prevState) => !prevState);
                setSelectedProject(null);
              }}
            >
              <span>
                <img
                  src={add_icon}
                  className={styles.add_pe_button__add_icon}
                />
              </span>
              Project
            </button>
          </div>
        )}

        <div className={styles.buttons}>
          <button
            className={styles.buttons_cancel}
            onClick={() =>
              setParentsEditStatus((prevState) => ({
                ...prevState,
                projects: !prevState.projects,
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

export default EditResumeProjectOpen;
