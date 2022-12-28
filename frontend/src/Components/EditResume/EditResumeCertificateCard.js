import react from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { BASE_URL } from "../../Keys/Keys";

import edit_pencil_icon__black from "../../icons/edit_pencil_icon__black.png";
import delete_icon_black from "../../icons/delete_icon_black.png";

import styles from "./EditResumeCertificateCard.module.css";

const EditResumeCertificateCard = ({
  certificatesCurrent,
  setSelectedCertificateParent,
  setEditCertificateCardStatusParent,
  setCertificatesCurrentParent,
  setParentsResumeDetails,
}) => {
  // console.log({ professionalExperiences });

  const onClickHandler = (certificate) => {
    console.log({ certificate });
    setSelectedCertificateParent(certificate);
    setEditCertificateCardStatusParent((prev) => !prev);
  };
  var { resumeId } = useParams();
  const onDeleteHandler = (certificate) => {
    var token = localStorage.getItem("token");

    var headers = {
      authorization: `Bearer ${token}`,
    };

    axios({
      method: "PATCH",
      url: `${BASE_URL}/api/resumes/edit-resume-delete-certificate`,
      data: {
        certificateId: certificate._id,
        resumeId: resumeId,
      },
      headers,
    })
      .then((res) => {
        console.log({ resp: res.data });

        if (res.data.status == 200) {
          setCertificatesCurrentParent(res.data.updatedResume.certificates);
          setParentsResumeDetails((prevState) => ({
            ...prevState,
            certificates: res.data.updatedResume.certificates,
          }));
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={styles.pe_list_container}>
      {certificatesCurrent.map((certificate) => (
        <div
          className={styles.pe_card}
          key={certificate._id}
          // onClick={() => onClickHandler(professionalExperience)}
        >
          <div className={styles.title_and_details_container}>
            <h3 className={styles.job_and_company}>
              <span className={styles.job_title}>{certificate.title}</span>
              <span className={styles.company}>{certificate.description}</span>
            </h3>
            {/* <p className={styles.date_and_location}>
              <span className={styles.start_and_end}>
                {professionalExperience.startDate} --
                {professionalExperience.endDate}
              </span>
              <span className={styles.location}>
                | {professionalExperience.location}
              </span>
            </p> */}
          </div>
          <div className={styles.delete_and_edit_icons_container}>
            <img
              src={edit_pencil_icon__black}
              className={styles.pe_icon}
              onClick={() => onClickHandler(certificate)}
            />
            <img
              src={delete_icon_black}
              className={styles.pe_icon}
              onClick={() => onDeleteHandler(certificate)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditResumeCertificateCard;
