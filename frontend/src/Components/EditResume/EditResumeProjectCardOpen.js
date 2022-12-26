import react, { useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { BASE_URL } from "../../Keys/Keys";

import styles from "./EditResumeProjectCardOpen.module.css";

const EditResumeProjectCardOpen = ({
  selectedProject,
  setEditProjectCardStatusParent,
  setProjectsCurrentParent,
  setParentsResumeDetails,
}) => {
  const [project, setProject] = useState(selectedProject);

  const setInputHandler = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  var { resumeId } = useParams();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    var token = localStorage.getItem("token");

    var headers = {
      authorization: `Bearer ${token}`,
    };

    if (selectedProject == null) {
      axios({
        method: "PATCH",
        url: `${BASE_URL}/api/resumes/edit-resume-add-project`,
        data: { ...project, resumeId: resumeId },
        headers,
      })
        .then((res) => {
          console.log({ resp: res.data });

          if (res.data.status == 200) {
            setEditProjectCardStatusParent((prevState) => !prevState);
            setProjectsCurrentParent(res.data.updatedResume.projects);
            setParentsResumeDetails((prevState) => ({
              ...prevState,
              projects: res.data.updatedResume.projects,
            }));
          }
        })
        .catch((err) => console.log(err));
    } else {
      //patch request api

      axios({
        method: "PATCH",
        url: `${BASE_URL}/api/resumes/edit-resume-edit-project`,
        data: {
          ...project,
          projectId: project._id,
          resumeId: resumeId,
        },
        headers,
      })
        .then((res) => {
          console.log({ resp: res.data });

          if (res.data.status == 200) {
            setEditProjectCardStatusParent((prevState) => !prevState);
            setProjectsCurrentParent(res.data.updatedResume.projects);
            setParentsResumeDetails((prevState) => ({
              ...prevState,
              projects: res.data.updatedResume.projects,
            }));
          }
        })
        .catch((err) => console.log(err));
    }

    // axios.patch()
  };

  return (
    <div className={styles.pe_edit_container}>
      <form onSubmit={formSubmitHandler}>
        <div className={styles.input_job_title_and_date_container}>
          <div className={styles.input_container}>
            <label className={styles.input_label}> Title</label>
            <input
              className={styles.input_item}
              // value={"Full Name"}
              value={project?.title}
              name="title"
              type="text"
              onChange={setInputHandler}
            />
          </div>
          <div className={styles.input_date_container}>
            <div className={styles.input_container}>
              <label className={styles.input_label}>Start Date</label>
              <input
                className={styles.input_item}
                value={project?.startDate}
                name="startDate"
                type="date"
                onChange={setInputHandler}
              />
            </div>
            <div className={styles.input_container}>
              <label className={styles.input_label}>End Date</label>
              <input
                className={styles.input_item}
                value={project?.endDate}
                name="endDate"
                type="date"
                onChange={setInputHandler}
              />
            </div>
          </div>
        </div>

        <div className={styles.input_employer_location}>
          <div className={styles.input_container}>
            <label className={styles.input_label}>subtitle</label>
            <input
              className={styles.input_item}
              value={project?.subTitle}
              name="subTitle"
              type="text"
              onChange={setInputHandler}
            />
          </div>
          <div className={styles.input_container}>
            <label className={styles.input_label}>link</label>
            <input
              className={styles.input_item}
              value={project?.link}
              name="link"
              type="text"
              onChange={setInputHandler}
            />
          </div>
        </div>

        <div className={styles.input_container}>
          <label className={styles.input_label}>Description</label>

          <textarea
            className={styles.input_item}
            value={project?.description}
            name="description"
            type="text"
            onChange={setInputHandler}
          />
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.buttons_cancel}
            onClick={() => {
              setEditProjectCardStatusParent((prevState) => !prevState);
            }}
          >
            cancel
          </button>
          <button className={styles.buttons_save} type="submit">
            save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditResumeProjectCardOpen;
