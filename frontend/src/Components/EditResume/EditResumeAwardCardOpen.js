import react, { useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { BASE_URL } from "../../Keys/Keys";

import styles from "./EditResumeAwardCardOpen.module.css";

const EditResumeAwardCardOpen = ({
  selectedAward,
  setEditAwardCardStatusParent,
  setAwardsCurrentParent,
  setParentsResumeDetails,
}) => {
  const [award, setAward] = useState(selectedAward);

  const setInputHandler = (e) => {
    setAward({
      ...award,
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

    if (selectedAward == null) {
      axios({
        method: "PATCH",
        url: `${BASE_URL}/api/resumes/edit-resume-add-award`,
        data: { ...award, resumeId: resumeId },
        headers,
      })
        .then((res) => {
          console.log({ resp: res.data });

          if (res.data.status == 200) {
            setEditAwardCardStatusParent((prevState) => !prevState);
            setAwardsCurrentParent(res.data.updatedResume.awards);
            setParentsResumeDetails((prevState) => ({
              ...prevState,
              awards: res.data.updatedResume.awards,
            }));
          }
        })
        .catch((err) => console.log(err));
    } else {
      //patch request api

      axios({
        method: "PATCH",
        url: `${BASE_URL}/api/resumes/edit-resume-edit-award`,
        data: {
          ...award,
          awardId: award._id,
          resumeId: resumeId,
        },
        headers,
      })
        .then((res) => {
          console.log({ resp: res.data });

          if (res.data.status == 200) {
            setEditAwardCardStatusParent((prevState) => !prevState);
            setAwardsCurrentParent(res.data.updatedResume.awards);
            setParentsResumeDetails((prevState) => ({
              ...prevState,
              awards: res.data.updatedResume.awards,
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
            <label className={styles.input_label}>title</label>
            <input
              className={styles.input_item}
              value={award?.title}
              name="title"
              type="text"
              onChange={setInputHandler}
            />
          </div>
          <div className={styles.input_date_container}>
            {/* <div className={styles.input_container}>
              <label className={styles.input_label}>Start Date</label>
              <input
                className={styles.input_item}
                value={professionalExperience?.startDate}
                name="startDate"
                type="date"
                onChange={setInputHandler}
              />
            </div> */}
            <div className={styles.input_container}>
              <label className={styles.input_label}>Issued Date</label>
              <input
                className={styles.input_item}
                value={award?.issuedDate}
                name="issuedDate"
                type="date"
                onChange={setInputHandler}
              />
            </div>
          </div>
        </div>

        <div className={styles.input_employer_location}>
          <div className={styles.input_container}>
            <label className={styles.input_label}>Issuer</label>
            <input
              className={styles.input_item}
              value={award?.issuer}
              name="issuer"
              type="text"
              onChange={setInputHandler}
            />
          </div>
          {/* <div className={styles.input_container}>
            <label className={styles.input_label}>Location </label>
            <input
              className={styles.input_item}
              value={professionalExperience?.location}
              name="location"
              type="text"
              onChange={setInputHandler}
            />
          </div> */}
        </div>

        <div className={styles.input_container}>
          <label className={styles.input_label}>Description</label>

          <textarea
            className={styles.input_item}
            value={award?.description}
            name="description"
            type="text"
            onChange={setInputHandler}
          />
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.buttons_cancel}
            onClick={() => {
              setEditAwardCardStatusParent((prevState) => !prevState);
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

export default EditResumeAwardCardOpen;
