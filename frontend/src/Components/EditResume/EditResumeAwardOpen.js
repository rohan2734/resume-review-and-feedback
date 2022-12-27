import react, { useState } from "react";

import EditResumeAwardCardOpen from "./EditResumeAwardCardOpen";
import EditResumeAwardCard from "./EditResumeAwardCard";

import add_icon from "../../icons/add_icon.png";

import styles from "./EditResumeAwardOpen.module.css";

const EditResumeAwardOpen = ({
  resume,
  awards,
  setParentsEditStatus,
  setParentsResumeDetails,
}) => {
  const [awardsCurrent, setAwardsCurrent] = useState(awards);
  const [selectedAward, setSelectedAward] = useState(null);
  const [editAwardCardStatus, setEditAwardCardStatus] = useState(false);

  console.log({ awardsCurrent });

  return (
    <>
      <div className={styles.pe__container}>
        <h3 className={styles.pe__title}>Edit Award</h3>
        {/* edit award  card open */}
        {editAwardCardStatus && (
          <EditResumeAwardCardOpen
            selectedAward={selectedAward}
            setEditAwardCardStatusParent={setEditAwardCardStatus}
            setAwardsCurrentParent={setAwardsCurrent}
            setParentsResumeDetails={setParentsResumeDetails}
          />
        )}
        {/* award  card list */}
        {!editAwardCardStatus && (
          <EditResumeAwardCard
            awardsCurrent={awardsCurrent}
            setSelectedAwardParent={setSelectedAward}
            setEditAwardCardStatusParent={setEditAwardCardStatus}
            setAwardsCurrentParent={setAwardsCurrent}
            setParentsResumeDetails={setParentsResumeDetails}
          />
        )}

        {!editAwardCardStatus && (
          <div className={styles.button_container}>
            <button
              className={styles.add_pe_button}
              onClick={() => {
                setEditAwardCardStatus((prevState) => !prevState);
                setSelectedAward(null);
              }}
            >
              <span>
                <img
                  src={add_icon}
                  className={styles.add_pe_button__add_icon}
                />
              </span>
              Award
            </button>
          </div>
        )}

        <div className={styles.buttons}>
          <button
            className={styles.buttons_cancel}
            onClick={() =>
              setParentsEditStatus((prevState) => ({
                ...prevState,
                awards: !prevState.awards,
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

export default EditResumeAwardOpen;
