import react from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { BASE_URL } from "../../Keys/Keys";

import edit_pencil_icon__black from "../../icons/edit_pencil_icon__black.png";
import delete_icon_black from "../../icons/delete_icon_black.png";

import styles from "./EditResumeEducationCard.module.css";

const EditResumeEducationCard = ({
  educationCurrent,
  setSelectedEducationParent,
  setEditEducationCardStatusParent,
  setEducationCurrentParent,
  setParentsResumeDetails,
}) => {
  // console.log({ professionalExperiences });

  const onClickHandler = (education) => {
    console.log({ education });
    setSelectedEducationParent(education);
    setEditEducationCardStatusParent((prev) => !prev);
  };
  var { resumeId } = useParams();
  const onDeleteHandler = (education) => {
    var token = localStorage.getItem("token");

    var headers = {
      authorization: `Bearer ${token}`,
    };

    axios({
      method: "PATCH",
      url: `${BASE_URL}/api/resumes/edit-resume-delete-education`,
      data: {
        educationId: education._id,
        resumeId: resumeId,
      },
      headers,
    })
      .then((res) => {
        console.log({ resp: res.data });

        if (res.data.status == 200) {
          setEducationCurrentParent(res.data.updatedResume.education);
          setParentsResumeDetails((prevState) => ({
            ...prevState,
            education: res.data.updatedResume.education,
          }));
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={styles.pe_list_container}>
      {educationCurrent.map((education) => (
        <div
          className={styles.pe_card}
          key={education._id}
          // onClick={() => onClickHandler(professionalExperience)}
        >
          <div className={styles.title_and_details_container}>
            <h3 className={styles.job_and_company}>
              <span className={styles.job_title}>{education.jobTitle}</span>
              <span className={styles.company}>{education.company}</span>
            </h3>
            <p className={styles.date_and_location}>
              <span className={styles.start_and_end}>
                {education.startDate} --
                {education.endDate}
              </span>
              <span className={styles.location}>| {education.location}</span>
            </p>
          </div>
          <div className={styles.delete_and_edit_icons_container}>
            <img
              src={edit_pencil_icon__black}
              className={styles.pe_icon}
              onClick={() => onClickHandler(education)}
            />
            <img
              src={delete_icon_black}
              className={styles.pe_icon}
              onClick={() => onDeleteHandler(education)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditResumeEducationCard;
