import React from 'react';

//css
import styles from "./Navbar.module.css";

const Navbar =() => {
    return (
        <nav>
            <ul className={styles.menu}>
                <div>
                    <li className={styles.menu__item}><span className={styles.name__item}>Perfect</span>Resume</li>
                </div>
                <div className={styles.menu__items}>
                    <li className={styles.menu__item}>About</li>
                    <li className={styles.menu__item}>my resume</li>
                    <li className={styles.menu__item}>find expert</li>
                    <li className={styles.menu__item}>view feedbacks</li>
                    <li className={styles.menu__item}>Logout</li>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;