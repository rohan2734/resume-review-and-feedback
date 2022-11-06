import React from "react";
import styles from "./EditResumeNameDetailsOpen.module.css";

import defaultProfilePic from "../images/profile_pic.png";
import editPencilIconBlack from "../icons/edit_pencil_icon__black.png";

const EditResumeNameOpen = ({ resume, setParentsEditStatus }) => {
  console.log({ resume });
  return (
    <>
      <div className={styles.edit_namedetails__container}>
        <h3 className={styles.namedetails_title}>Edit Person</h3>
        <div className={styles.name_details_container}>
          <div className={styles.inputs_with_edit_image}>
            <div className={styles.inputs}>
              <div className={styles.input_container}>
                <label className={styles.input_label}>Full Name</label>
                <input className={styles.input_item} value={"Full Name"} />
              </div>
              <div className={styles.input_container}>
                <label className={styles.input_label}>Full Name</label>
                <input className={styles.input_item} value={"Full Name"} />
              </div>
              <div className={styles.input_container}>
                <label className={styles.input_label}>Full Name</label>
                <input className={styles.input_item} value={"Full Name"} />
              </div>
            </div>
            <div className={styles.edit_image_container}>
              <img
                src={defaultProfilePic}
                className={styles.namedetails_image}
              />
              <label for="firstimage">
                <img
                  src={editPencilIconBlack}
                  className={styles.edit_image_icon}
                />
              </label>
              {/* <input type="file" id="firstimage" style="display:none;" /> */}
              <input
                type="file"
                id="firstimage"
                className={styles.edit_image_input}
              />
            </div>
          </div>
          <div className={styles.inputs_remaining}>
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
        <div className={styles.links_container}>
          <h3 className={styles.namedetails_subtitle}>Links</h3>
          <div className={styles.links_subcontainer}>
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

        <div className={styles.buttons}>
          <button
            className={styles.buttons_cancel}
            onClick={() =>
              setParentsEditStatus((prevState) => ({
                ...prevState,
                nameDetails: !prevState.nameDetails,
              }))
            }
          >
            cancel
          </button>
          <button className={styles.buttons_save}>save</button>
        </div>
      </div>
    </>
  );
};

export default EditResumeNameOpen;
