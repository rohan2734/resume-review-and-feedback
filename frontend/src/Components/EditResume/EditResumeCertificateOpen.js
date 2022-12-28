import react, { useState } from "react";

import EditResumeCertificateCardOpen from "./EditResumeCertificateCardOpen";
import EditResumeCertificateCard from "./EditResumeCertificateCard";

import add_icon from "../../icons/add_icon.png";

import styles from "./EditResumeCertificateOpen.module.css";

const EditResumeCertificateOpen = ({
  resume,
  certificates,
  setParentsEditStatus,
  setParentsResumeDetails,
}) => {
  const [certificatesCurrent, setCertificatesCurrent] = useState(certificates);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [editCertificateCardStatus, setEditCertificateCardStatus] =
    useState(false);

  console.log({ CertificatesCurrent });

  return (
    <>
      <div className={styles.pe__container}>
        <h3 className={styles.pe__title}>Edit Certificate</h3>
        {/* edit certificate  card open */}
        {editCertificateCardStatus && (
          <EditResumeCertificateCardOpen
            selectedCertificate={selectedCertificate}
            setEditCertificateCardStatusParent={setEditCertificateCardStatus}
            setCertificatesCurrentParent={setCertificatesCurrent}
            setParentsResumeDetails={setParentsResumeDetails}
          />
        )}
        {/* Certificate  card list */}
        {!editCertificateCardStatus && (
          <EditResumeCertificateCard
            certificatesCurrent={certificatesCurrent}
            setSelectedCertificateParent={setSelectedCertificate}
            setEditCertificateCardStatusParent={setEditCertificateCardStatus}
            setCertificatesCurrentParent={setCertificatesCurrent}
            setParentsResumeDetails={setParentsResumeDetails}
          />
        )}

        {!editCertificateCardStatus && (
          <div className={styles.button_container}>
            <button
              className={styles.add_pe_button}
              onClick={() => {
                setEditCertificateCardStatus((prevState) => !prevState);
                setSelectedCertificate(null);
              }}
            >
              <span>
                <img
                  src={add_icon}
                  className={styles.add_pe_button__add_icon}
                />
              </span>
              Certificate
            </button>
          </div>
        )}

        <div className={styles.buttons}>
          <button
            className={styles.buttons_cancel}
            onClick={() =>
              setParentsEditStatus((prevState) => ({
                ...prevState,
                certificates: !prevState.certificates,
              }))
            }
          >
            close
          </button>
        </div>
      </div>
    </>
  );
};

export default EditResumeCertificateOpen;
