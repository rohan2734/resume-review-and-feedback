import React from 'react';
import {Link} from "react-router-dom"

import styles from "./ResumeCardRectangularBox.module.css";

import editIcon from "../icons/edit_pencil_icon.png";
import deleteIcon from "../icons/delete_icon.png";

const  ResumeCardRectangularBox = ({resume}) => {
   
    // console.log({resume});
    return (
        // <Link to={`/edit-resume/${resume._id}`} className={styles.container__parent}>
            <div className={styles.container} >
                 <Link to={`/edit-resume/${resume._id}`} className={styles.container__parent}>
                     <h3 className={styles.container__title}>{resume.resumeName}</h3>
                </Link>
                <div className={styles.container__icons}>
                    <Link to={`/edit-resume/${resume._id}`} className={styles.container__parent}>
                        <img src={editIcon} className={styles.container__icon} />
                    </Link>
                    <img src={deleteIcon} className={styles.container__icon} />
                </div>
            </div>
        // </Link>
    );
}

export default ResumeCardRectangularBox;