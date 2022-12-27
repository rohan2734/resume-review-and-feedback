import react from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { BASE_URL } from "../../Keys/Keys";

import edit_pencil_icon__black from "../../icons/edit_pencil_icon__black.png";
import delete_icon_black from "../../icons/delete_icon_black.png";

import styles from "./EditResumeAwardCard.module.css";

const EditResumeAwardCard = ({
  awardsCurrent,
  setSelectedAwardParent,
  setEditAwardCardStatusParent,
  setAwardsCurrentParent,
  setParentsResumeDetails,
}) => {
  // console.log({ professionalExperiences });

  const onClickHandler = (award) => {
    console.log({ award });
    setSelectedAwardParent(award);
    setEditAwardCardStatusParent((prev) => !prev);
  };
  var { resumeId } = useParams();
  const onDeleteHandler = (award) => {
    var token = localStorage.getItem("token");

    var headers = {
      authorization: `Bearer ${token}`,
    };

    axios({
      method: "PATCH",
      url: `${BASE_URL}/api/resumes/edit-resume-delete-award`,
      data: {
        awardId: award._id,
        resumeId: resumeId,
      },
      headers,
    })
      .then((res) => {
        console.log({ resp: res.data });

        if (res.data.status == 200) {
          setAwardsCurrentParent(res.data.updatedResume.awards);
          setParentsResumeDetails((prevState) => ({
            ...prevState,
            awards: res.data.updatedResume.awards,
          }));
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={styles.pe_list_container}>
      {awardsCurrent.map((award) => (
        <div className={styles.pe_card} key={award._id}>
          <div className={styles.title_and_details_container}>
            <h3 className={styles.job_and_company}>
              <span className={styles.job_title}>{award.title}</span>
            </h3>
            <p className={styles.date_and_location}>
              <span className={styles.start_and_end}>{award.issuedDate}</span>
            </p>
          </div>
          <div className={styles.delete_and_edit_icons_container}>
            <img
              src={edit_pencil_icon__black}
              className={styles.pe_icon}
              onClick={() => onClickHandler(award)}
            />
            <img
              src={delete_icon_black}
              className={styles.pe_icon}
              onClick={() => onDeleteHandler(award)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditResumeAwardCard;
