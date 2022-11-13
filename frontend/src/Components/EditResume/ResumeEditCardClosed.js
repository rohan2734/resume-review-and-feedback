import React from "react";

import styles from "./ResumeEditCardClosed.module.css";

// import editResumeDropdown from "../icons/edit_resume_dropdown.png";
import editResumeDropdown from "../../icons/edit_resume_dropdown.png";

const ResumeEditCardClosed = ({
  title,
  cardIcon,
  setParentsEditStatus,
  editStatusKey,
}) => {
  // editStatusKey="profileDescription"
  return (
    <div className={styles.resume__edit_card}>
      <img src={cardIcon} className={styles.resume__edit_card_icon} />
      <h3 className={styles.resume__edit_card_title}>{title}</h3>
      <img
        className={styles.resume__edit_card_dropdown}
        src={editResumeDropdown}
        onClick={() =>
          setParentsEditStatus((prevState) => ({
            ...prevState,
            [editStatusKey]: !prevState[editStatusKey],
          }))
        }
      />
    </div>
  );
};

export default ResumeEditCardClosed;
