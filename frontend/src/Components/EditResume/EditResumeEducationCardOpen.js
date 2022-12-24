import react, { useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { BASE_URL } from "../../Keys/Keys";

import styles from "./EditResumeEducationCardOpen.module.css";

const EditResumeEducationCardOpen = ({
  selectedEducation,
  setEditEducationCardStatusParent,
  setEducationCurrentParent,
  setParentsResumeDetails,
}) => {
  const [education, setEducation] = useState(selectedEducation);

  const setInputHandler = (e) => {
    setEducation({
      ...education,
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

    if (selectedEducation == null) {
      axios({
        method: "PATCH",
        url: `${BASE_URL}/api/resumes/edit-resume-add-education`,
        data: { ...education, resumeId: resumeId },
        headers,
      })
        .then((res) => {
          console.log({ resp: res.data });

          if (res.data.status == 200) {
            setEditEducationCardStatusParent((prevState) => !prevState);
            setEducationCurrentParent(res.data.updatedResume.education);
            setParentsResumeDetails((prevState) => ({
              ...prevState,
              education: res.data.updatedResume.education,
            }));
          }
        })
        .catch((err) => console.log(err));
    } else {
      //patch request api

      axios({
        method: "PATCH",
        url: `${BASE_URL}/api/resumes/edit-resume-edit-education`,
        data: {
          ...education,
          educationId: education._id,
          resumeId: resumeId,
        },
        headers,
      })
        .then((res) => {
          console.log({ resp: res.data });

          if (res.data.status == 200) {
            setEditEducationCardStatusParent((prevState) => !prevState);
            setEducationCurrentParent(res.data.updatedResume.education);
            setParentsResumeDetails((prevState) => ({
              ...prevState,
              education: res.data.updatedResume.education,
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
            <label className={styles.input_label}>Degree</label>
            <input
              className={styles.input_item}
              // value={"Full Name"}
              value={education?.degree}
              name="degree"
              type="text"
              onChange={setInputHandler}
            />
          </div>
          <div className={styles.input_date_container}>
            <div className={styles.input_container}>
              <label className={styles.input_label}>Start Date</label>
              <input
                className={styles.input_item}
                value={education?.startDate}
                name="startDate"
                type="date"
                onChange={setInputHandler}
              />
            </div>
            <div className={styles.input_container}>
              <label className={styles.input_label}>End Date</label>
              <input
                className={styles.input_item}
                value={education?.endDate}
                name="endDate"
                type="date"
                onChange={setInputHandler}
              />
            </div>
          </div>
        </div>

        <div className={styles.input_employer_location}>
          <div className={styles.input_container}>
            <label className={styles.input_label}>School</label>
            <input
              className={styles.input_item}
              value={education?.school}
              name="school"
              type="text"
              onChange={setInputHandler}
            />
          </div>
          <div className={styles.input_container}>
            <label className={styles.input_label}>Location </label>
            <input
              className={styles.input_item}
              value={education?.location}
              name="location"
              type="text"
              onChange={setInputHandler}
            />
          </div>
        </div>

        <div className={styles.input_container}>
          <label className={styles.input_label}>Description</label>

          <textarea
            className={styles.input_item}
            value={education?.description}
            name="description"
            type="text"
            onChange={setInputHandler}
          />
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.buttons_cancel}
            onClick={() => {
              setEditEducationCardStatusParent((prevState) => !prevState);
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

export default EditResumeEducationCardOpen;
