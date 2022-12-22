import react, { useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { BASE_URL } from "../../Keys/Keys";

import styles from "./EditResumeProfessionalExperienceCardOpen.module.css";

const EditResumeSkillCardOpen = ({
  selectedSkill,
  setEditSkillCardStatusParent,
  setSkillsCurrentParent,
  setParentsResumeDetails,
}) => {
  const [skill, setSkill] = useState(selectedSkill);

  console.log({ selectedSkill });

  const setInputHandler = (e) => {
    setSkill({
      ...skill,
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

    if (selectedSkill == null) {
      axios({
        method: "PATCH",
        url: `${BASE_URL}/api/resumes/edit-resume-add-skill`,
        data: { ...skill, resumeId: resumeId },
        headers,
      })
        .then((res) => {
          console.log({ resp: res.data });

          if (res.data.status == 200) {
            setEditSkillCardStatusParent((prevState) => !prevState);
            setSkillsCurrentParent((prevState) => [
              ...prevState,
              res.data.updatedResume.skills,
            ]);
            setParentsResumeDetails((prevState) => ({
              ...prevState,
              skills: res.data.updatedResume.skills,
            }));
          }
        })
        .catch((err) => console.log(err));
    } else {
      //patch request api

      axios({
        method: "PATCH",
        url: `${BASE_URL}/api/resumes/edit-resume-edit-skill`,
        data: {
          ...skill,
          skillId: skill._id,
          resumeId: resumeId,
        },
        headers,
      })
        .then((res) => {
          console.log({ resp: res.data });

          if (res.data.status == 200) {
            setEditSkillCardStatusParent((prevState) => !prevState);
            setSkillsCurrentParent((prevState) => [
              ...prevState,
              res.data.updatedResume.skills,
            ]);
            setParentsResumeDetails((prevState) => ({
              ...prevState,
              skills: res.data.updatedResume.skills,
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
            <label className={styles.input_label}>Skill Name</label>
            <input
              className={styles.input_item}
              // value={"Full Name"}
              value={skill?.skillName}
              name="skillName"
              type="text"
              onChange={setInputHandler}
            />
          </div>
          <div className={styles.input_date_container}>
            <div className={styles.input_container}>
              <label className={styles.input_label}>Skill Level</label>

              <select
                name="skillLevel"
                onChange={setInputHandler}
                value={skill?.skillLevel}
                className={styles.input_item}
              >
                <option value="novice">Novice</option>
                <option value="beginner">beginner</option>
                <option value="skillful">skillful</option>
                <option value="experienced">experienced</option>
                <option value="expert">expert</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.buttons_cancel}
            onClick={() => {
              setEditSkillCardStatusParent((prevState) => !prevState);
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

export default EditResumeSkillCardOpen;
