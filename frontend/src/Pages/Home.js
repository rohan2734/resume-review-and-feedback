import React from 'react';
import styles from "./Home.module.css";

import hw_create_resume from "../images/hw_create_resume.png";
import hw_fill_resume from "../images/hw_fill_resume.png";
import hw_upload from "../images/hw_upload.png";


const Home = () => {
    return (
        <>
        <div  className={styles.container__parent}>
            <div className={styles.container}>
                <h1 className={styles.container__title}>Getting a <span className={styles.container__title__highlight}>Great Job</span> starts with a <span className={styles.container__title__highlight}>Great Resume</span></h1>
                <h2 className={styles.container__subtitle}>Get your resume reviewed by experts in various domains</h2>
                <button className={styles.container__button}>Upload your resume for experts review</button>
            </div> 
        </div>
       <div className={styles.container_2}>
             <h1 className={styles.container_2__title}>How it works?</h1>
            <div className={styles.steps__container}>
                <div className={styles.step_container}>
                    <div className={styles.step_content}>
                        <h2 className={styles.step_content__title}>create a resume</h2>
                        <p className={styles.step_content__description}>
                            From the home page, enter the name of the resume which 
                            you want to create, and click Add
                        </p>
                    </div>
                    
                    <div className={styles.step}>
                        <p className={styles.step__subtitle}>STEP</p>
                        <p className={styles.step__count}>01</p>
                        <div className={styles.step__line}></div>
                    </div>
                    {/* <img src={}/> */}
                    <div className={styles.image_container}>
                        <img src={hw_create_resume} className={styles.step_image} />
                    </div>
                </div>

                {/* step2 */}
                <div className={styles.step_container}>
                     <div className={styles.image_container}>
                        <img src={hw_fill_resume} className={styles.step_image} />
                    </div>
                   
                    
                    <div className={styles.step}>
                        <p className={styles.step__subtitle}>STEP</p>
                        <p className={styles.step__count}>02</p>
                        <div className={styles.step__line}></div>
                    </div>

                    <div className={styles.step_content}>
                        <h2 className={styles.step_content__title}>Fill the details</h2>
                        <p className={styles.step_content__description}>
                        after creating the resume, fill the details about your intro, 
                        technical skills, education , work experience, certificates, 
                        name and address etc
                        </p>
                    </div>
                   
                    
                </div>
                {/* step3 */}
                <div className={styles.step_container}>
                    <div className={styles.step_content}>
                        <h2 className={styles.step_content__title}>publish the resume for review</h2>
                        <p className={styles.step_content__description}>
                        after filling the details, just click on save and publish the resume for review, now you can sit back and wait for the industrty expert to review your resume, or you can request a
                        industry expert for review
                        </p>
                    </div>
                    
                    <div className={styles.step}>
                        <p className={styles.step__subtitle}>STEP</p>
                        <p className={styles.step__count}>03</p>
                        <div className={styles.step__line}></div>
                    </div>
             
                    <div className={styles.image_container}>
                        <img src={hw_upload} className={styles.step_image} />
                    </div>
                </div>
            </div>
         </div>
         </>
    );
}

export default Home;