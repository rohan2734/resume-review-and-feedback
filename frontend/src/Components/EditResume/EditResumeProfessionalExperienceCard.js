import react from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { BASE_URL } from "../../Keys/Keys";

import edit_pencil_icon__black from "../../icons/edit_pencil_icon__black.png";
import delete_icon_black from "../../icons/delete_icon_black.png";

import styles from "./EditResumeProfessionalExperienceCard.module.css";

const EditResumeProfessionalExperienceCard = ({
  professionalExperiencesCurrent,
  setSelectedProfessionalExperienceParent,
  setEditProfessionalExperienceCardStatusParent,
  setProfessionalExperiencesCurrentParent,
  setParentsResumeDetails,
}) => {
  // console.log({ professionalExperiences });

  const onClickHandler = (professionalExperience) => {
    console.log({ professionalExperience });
    setSelectedProfessionalExperienceParent(professionalExperience);
    setEditProfessionalExperienceCardStatusParent((prev) => !prev);
  };
  var { resumeId } = useParams();
  const onDeleteHandler = (professionalExperience) => {
    var token = localStorage.getItem("token");

    var headers = {
      authorization: `Bearer ${token}`,
    };

    axios({
      method: "PATCH",
      url: `${BASE_URL}/api/resumes/edit-resume-delete-professional-experience`,
      data: {
        professionalExperienceId: professionalExperience._id,
        resumeId: resumeId,
      },
      headers,
    })
      .then((res) => {
        console.log({ resp: res.data });

        if (res.data.status == 200) {
          setProfessionalExperiencesCurrentParent(
            res.data.updatedResume.professionalExperiences
          );
          setParentsResumeDetails((prevState) => ({
            ...prevState,
            professionalExperiences:
              res.data.updatedResume.professionalExperiences,
          }));
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={styles.pe_list_container}>
      {professionalExperiencesCurrent.map((professionalExperience) => (
        <div
          className={styles.pe_card}
          key={professionalExperience._id}
          // onClick={() => onClickHandler(professionalExperience)}
        >
          <div className={styles.title_and_details_container}>
            <h3 className={styles.job_and_company}>
              <span className={styles.job_title}>
                {professionalExperience.jobTitle}
              </span>
              <span className={styles.company}>
                {professionalExperience.company}
              </span>
            </h3>
            <p className={styles.date_and_location}>
              <span className={styles.start_and_end}>
                {professionalExperience.startDate} --
                {professionalExperience.endDate}
              </span>
              <span className={styles.location}>
                | {professionalExperience.location}
              </span>
            </p>
          </div>
          <div className={styles.delete_and_edit_icons_container}>
            <img
              src={edit_pencil_icon__black}
              className={styles.pe_icon}
              onClick={() => onClickHandler(professionalExperience)}
            />
            <img
              src={delete_icon_black}
              className={styles.pe_icon}
              onClick={() => onDeleteHandler(professionalExperience)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditResumeProfessionalExperienceCard;
