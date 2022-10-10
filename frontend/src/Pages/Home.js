import React from 'react';
import styles from "./Home.module.css";

const Home = () => {
    return (
        <div  className={styles.container__parent}>
         <div className={styles.container}>
            <h1 className={styles.container__title}>Getting a <span className={styles.container__title__highlight}>Great Job</span> starts with a <span className={styles.container__title__highlight}>Great Resume</span></h1>
            <h2 className={styles.container__subtitle}>Get your resume reviewed by experts in various domains</h2>
            <button className={styles.container__button}>Upload your resume for experts review</button>
        </div>
        </div>
       
    );
}

export default Home;