import react, { useState } from "react";

import add_icon from "../../icons/add_icon.png";
import edit_pencil_icon__black from "../../icons/edit_pencil_icon__black.png";
import delete_icon_black from "../../icons/delete_icon_black.png";

import styles from "./EditResumeProfessionalExperienceOpen.module.css";

const EditResumeProfessionalExperienceOpen = ({
  resume,
  setParentsEditStatus,
}) => {
  // const [professionalExperiences, setProfessionalExperiences] = useState(
  //   resume.professionalExperiences || []
  // );
  const [selectedProfessionalExperience, setSelectedProfessionalExperience] =
    useState({});

  console.log({ selectedProfessionalExperience });
  console.log({ resume });
  return (
    <>
      <div className={styles.pe__container}>
        <h3 className={styles.pe__title}>Edit Professional Experience</h3>
        {!selectedProfessionalExperience && (
          // <div className={styles.pe_list_container}>
          //   {professionalExperiences.map((professionalExperience) => (
          //     <div
          //       className={styles.pe_card}
          //       onClick={() =>
          //         selectedProfessionalExperience(professionalExperience)
          //       }
          //     >
          //       <div className={styles.title_and_details_container}>
          //         <h3 className={styles.job_and_company}>
          //           {/* <span className={styles.job_title}>Software Developer,</span>
          //         <span className={styles.company}>Fryction Inc </span> */}
          //           <span className={styles.job_title}>
          //             {professionalExperience.jobTitle}
          //           </span>
          //           <span className={styles.company}>
          //             {professionalExperience.company}
          //           </span>
          //         </h3>
          //         <p className={styles.date_and_location}>
          //           {/* <span className={styles.start_and_end}>
          //           2018-03-01 -- 2018-10-01
          //         </span>
          //         <span className={styles.location}> | France , UK </span> */}
          //           <span className={styles.start_and_end}>
          //             {professionalExperience.startDate} --{" "}
          //             {professionalExperience.endDate}
          //           </span>
          //           <span className={styles.location}>
          //             {" "}
          //             | {professionalExperience.location}
          //           </span>
          //         </p>
          //       </div>
          //       <div className={styles.delete_and_edit_icons_container}>
          //         <img
          //           src={edit_pencil_icon__black}
          //           className={styles.pe_icon}
          //         />
          //         <img src={delete_icon_black} className={styles.pe_icon} />
          //       </div>
          //     </div>
          //   ))}
          // </div>
          <EditResumeProfessionalExperienceOpen
            professionalExperiences={resume.professionalExperiences}
          />
        )}
        {selectedProfessionalExperience && (
          // <div className={styles.pe_edit_container}>
          //   <form>
          //     <div className={styles.input_job_title_and_date_container}>
          //       <div className={styles.input_container}>
          //         <label className={styles.input_label}>Job Title</label>
          //         <input
          //           className={styles.input_item}
          //           // value={"Full Name"}

          //           // value={resumeNameDetails.fullName}
          //           // name="fullName"
          //           // type="text"
          //           // onChange={setInputHandler}
          //         />
          //       </div>
          //       <div className={styles.input_date_container}>
          //         <div className={styles.input_container}>
          //           <label className={styles.input_label}>Start Date</label>
          //           <input
          //             className={styles.input_item}
          //             // value={"Full Name"}

          //             // value={resumeNameDetails.fullName}
          //             // name="fullName"
          //             // type="text"
          //             // onChange={setInputHandler}
          //           />
          //         </div>
          //         <div className={styles.input_container}>
          //           <label className={styles.input_label}>End Date</label>
          //           <input
          //             className={styles.input_item}
          //             // value={"Full Name"}

          //             // value={resumeNameDetails.fullName}
          //             // name="fullName"
          //             // type="text"
          //             // onChange={setInputHandler}
          //           />
          //         </div>
          //       </div>
          //     </div>

          //     <div className={styles.input_employer_location}>
          //       <div className={styles.input_container}>
          //         <label className={styles.input_label}>Employer</label>
          //         <input
          //           className={styles.input_item}
          //           // value={"Full Name"}

          //           // value={resumeNameDetails.fullName}
          //           // name="fullName"
          //           // type="text"
          //           // onChange={setInputHandler}
          //         />
          //       </div>
          //       <div className={styles.input_container}>
          //         <label className={styles.input_label}>Location </label>
          //         <input
          //           className={styles.input_item}
          //           // value={"Full Name"}

          //           // value={resumeNameDetails.fullName}
          //           // name="fullName"
          //           // type="text"
          //           // onChange={setInputHandler}
          //         />
          //       </div>
          //     </div>

          //     <div className={styles.input_container}>
          //       <label className={styles.input_label}>Description</label>

          //       <textarea
          //         className={styles.input_item}
          //         // value={profileDescription}
          //         // name="profileDescription"
          //         rows="4"
          //         // onChange={(e) => setProfileDescription(e.target.value)}
          //         //   cols="500"
          //       />
          //     </div>
          //   </form>
          // </div>
          <EditResumeProfessionalExperienceOpen
            professionalExperience={selectedProfessionalExperience}
          />
        )}
        <div className={styles.button_container}>
          <button className={styles.add_pe_button}>
            <span>
              <img src={add_icon} className={styles.add_pe_button__add_icon} />
            </span>
            Professional Experience
          </button>
        </div>

        {/* <div className={styles.buttons}>
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
          <button className={styles.buttons_save} type="submit">
            save
          </button>
        </div> */}
      </div>
    </>
  );
};

export default EditResumeProfessionalExperienceOpen;
