import react, { useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { BASE_URL } from "../../Keys/Keys";

import styles from "./EditResumeCertificateCardOpen.module.css";

const EditResumeCertificateCardOpen = ({
  selectedCertificate,
  setEditCertificateCardStatusParent,
  setCertificatesCurrentParent,
  setParentsResumeDetails,
}) => {
  const [certificate, setCertificate] = useState(selectedCertificate);

  const setInputHandler = (e) => {
    setCertificate({
      ...certificate,
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

    if (selectedProfessionalExperience == null) {
      axios({
        method: "PATCH",
        url: `${BASE_URL}/api/resumes/edit-resume-add-certificate`,
        data: { ...certificate, resumeId: resumeId },
        headers,
      })
        .then((res) => {
          console.log({ resp: res.data });

          if (res.data.status == 200) {
            setEditCertificateCardStatusParent((prevState) => !prevState);
            setCertificatesCurrentParent(res.data.updatedResume.certificates);
            setParentsResumeDetails((prevState) => ({
              ...prevState,
              certificates: res.data.updatedResume.certificates,
            }));
          }
        })
        .catch((err) => console.log(err));
    } else {
      //patch request api

      axios({
        method: "PATCH",
        url: `${BASE_URL}/api/resumes/edit-resume-edit-certificate`,
        data: {
          ...certificate,
          certificateId: certificate._id,
          resumeId: resumeId,
        },
        headers,
      })
        .then((res) => {
          console.log({ resp: res.data });

          if (res.data.status == 200) {
            setEditCertificateCardStatusParent((prevState) => !prevState);
            setCertificatesCurrentParent(res.data.updatedResume.certificates);
            setParentsResumeDetails((prevState) => ({
              ...prevState,
              certificates: res.data.updatedResume.certificates,
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
              value={certificate?.title}
              name="title"
              type="text"
              onChange={setInputHandler}
            />
          </div>
          <div className={styles.input_date_container}>
            <div className={styles.input_container}>
              <label className={styles.input_label}>link</label>
              <input
                className={styles.input_item}
                value={certificate?.link}
                name="link"
                type="date"
                onChange={setInputHandler}
              />
            </div>
            {/* <div className={styles.input_container}>
              <label className={styles.input_label}>End Date</label>
              <input
                className={styles.input_item}
                value={professionalExperience?.endDate}
                name="endDate"
                type="date"
                onChange={setInputHandler}
              />
            </div> */}
          </div>
        </div>

        <div className={styles.input_container}>
          <label className={styles.input_label}>Description</label>

          <textarea
            className={styles.input_item}
            value={certificate?.description}
            name="description"
            type="text"
            onChange={setInputHandler}
          />
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.buttons_cancel}
            onClick={() => {
              setEditCertificateCardStatusParent((prevState) => !prevState);
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

export default EditResumeCertificateCardOpen;
