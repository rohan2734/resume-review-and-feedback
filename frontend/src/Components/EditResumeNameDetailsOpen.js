import React from "react";
import styles from "./EditResumeNameDetailsOpen.module.css";

const EditResumeNameOpen = ({ resume }) => {
  console.log({ resume });
  return (
    <>
      <div className={styles.edit_namedetails__container}>
        <div className={styles.name_details_container}>
          <div className={styles.input_container}>
            <label className={styles.input_label}>Full Name</label>
            <input className={styles.input_item} value={"Full Name"} />
          </div>
        </div>
        <div className={styles.links_container}>
          <div>
            <div className={styles.input_container}>
              <label className={styles.input_label}>Full Name</label>
              <input className={styles.input_item} value={"Full Name"} />
            </div>
            <div className={styles.input_container}>
              <label className={styles.input_label}>Full Name</label>
              <input className={styles.input_item} value={"Full Name"} />
            </div>
          </div>
          <div>
            <div className={styles.input_container}>
              <label className={styles.input_label}>Full Name</label>
              <input className={styles.input_item} value={"Full Name"} />
            </div>
            <div className={styles.input_container}>
              <label className={styles.input_label}>Full Name</label>
              <input className={styles.input_item} value={"Full Name"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditResumeNameOpen;
