import react from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { BASE_URL } from "../../Keys/Keys";

import edit_pencil_icon__black from "../../icons/edit_pencil_icon__black.png";
import delete_icon_black from "../../icons/delete_icon_black.png";

import styles from "./EditResumeProjectCard.module.css";

const EditResumeProjectCard = ({
  projectsCurrent,
  setSelectedProjectParent,
  setEditProjectCardStatusParent,
  setProjectsCurrentParent,
  setParentsResumeDetails,
}) => {
  const onClickHandler = (project) => {
    console.log({ project });
    setSelectedProjectParent(project);
    setEditProjectCardStatusParent((prev) => !prev);
  };
  var { resumeId } = useParams();
  const onDeleteHandler = (project) => {
    var token = localStorage.getItem("token");

    var headers = {
      authorization: `Bearer ${token}`,
    };

    axios({
      method: "PATCH",
      url: `${BASE_URL}/api/resumes/edit-resume-delete-project`,
      data: {
        projectId: project._id,
        resumeId: resumeId,
      },
      headers,
    })
      .then((res) => {
        console.log({ resp: res.data });

        if (res.data.status == 200) {
          setProjectsCurrentParent(res.data.updatedResume.projects);
          setParentsResumeDetails((prevState) => ({
            ...prevState,
            projects: res.data.updatedResume.projects,
          }));
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={styles.pe_list_container}>
      {projectsCurrent.map((project) => (
        <div className={styles.pe_card} key={project._id}>
          <div className={styles.title_and_details_container}>
            <h3 className={styles.job_and_company}>
              <span className={styles.job_title}>{project.title},</span>
              <span className={styles.company}>{project.subTitle}</span>
            </h3>
            <p className={styles.date_and_location}>
              <span className={styles.start_and_end}>
                {project.startDate} --
                {project.endDate}
              </span>
            </p>
          </div>
          <div className={styles.delete_and_edit_icons_container}>
            <img
              src={edit_pencil_icon__black}
              className={styles.pe_icon}
              onClick={() => onClickHandler(project)}
            />
            <img
              src={delete_icon_black}
              className={styles.pe_icon}
              onClick={() => onDeleteHandler(project)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditResumeProjectCard;
