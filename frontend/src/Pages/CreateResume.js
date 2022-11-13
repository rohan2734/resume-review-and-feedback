import React, { useEffect, useState } from "react";

import axios from "axios";

import styles from "./CreateResume.module.css";
import { BASE_URL } from "../Keys/Keys";

import ResumeCardRectangularBox from "../Components/EditResume/ResumeCardRectangularBox";

const CreateResume = () => {
  // const [resumeName,setResumeName]  = useState("");
  const [resumeDetails, setResumeDetails] = useState({
    resumeName: "",
    resumeStatusMessage: "",
    resumes: [],
  });

  useEffect(() => {
    var token = localStorage.getItem("token");
    // console.log({token20f: token});

    // token = token.slice(1,-1)

    const headers = {
      authorization: `Bearer ${token}`,
    };

    axios
      .get(`${BASE_URL}/api/resumes/get-resumes`, { headers })
      .then((res) => {
        // console.log({data: res.data});
        setResumeDetails({ ...resumeDetails, resumes: res.data.resumes });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCreateResumeSubmit = (e) => {
    e.preventDefault();
    const data = {
      resumeName: resumeDetails.resumeName,
    };
    var token = localStorage.getItem("token");

    const headers = {
      authorization: `Bearer ${token}`,
    };
    axios
      .post(`${BASE_URL}/api/resumes/create-resume`, data, { headers })
      .then((res) => {
        console.log({ resp: res.data });
        setResumeDetails({
          ...resumeDetails,
          resumeStatusMessage: res.data.message,
        });
      });
  };

  return (
    <div className={styles.container__parent}>
      <div className={styles.container}>
        <h1 className={styles.container__title}> Resumes</h1>

        {/* {console.log({resumeDetails})} */}
        {resumeDetails.resumes.length == 0 ? (
          <>
            <h3 className={styles.container__subtitle}>
              create your resume and request for experts review
            </h3>

            <form className={styles.inputs} onSubmit={handleCreateResumeSubmit}>
              <div className={styles.input__item}>
                <label className={styles.input__label}>Resume Name</label>
                <input
                  name="resumeName"
                  className={styles.input__field}
                  placeholder="enter resume name"
                  value={resumeDetails.resumeName}
                  onChange={(e) =>
                    setResumeDetails({
                      ...resumeDetails,
                      resumeName: e.target.value,
                    })
                  }
                  type="text"
                />
              </div>
              <button className={styles.container__submit} type="submit">
                Create Resume
              </button>
            </form>
            <h4 className={styles.container__subtitle}>
              {resumeDetails.resumeStatusMessage}
            </h4>
          </>
        ) : (
          <>
            {resumeDetails?.resumes?.map((resume) => {
              return (
                <ResumeCardRectangularBox key={resume._id} resume={resume} />
              );
            })}

            <button className={styles.submit_for_review}>
              Get Experts review for your resume now
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateResume;
