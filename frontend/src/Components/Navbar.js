import React from 'react';
import {NavLink} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

//css
import styles from "./Navbar.module.css";
import { logout } from '../store/authenticateSlice';

const Navbar =() => {
    
    const isLogin = useSelector((state) => state.authenticator.isLogin);
    const dispatch = useDispatch();

    return (
        <nav>
            <ul className={styles.menu}>
                <div>
                    <li className={styles.menu__item}><span className={styles.name__item}>Perfect</span>Resume</li>
                </div>
                <div className={styles.menu__items}>
                    <li className={styles.menu__item}>
                        <NavLink to='/'
                            className={ ({isActive}) => (isActive ? `${styles.active} ` : styles.menu__item) }>
                            Home
                        </NavLink>
                    </li>
                    <li className={styles.menu__item}>
                        <NavLink to='/about'
                            className={ ({isActive}) => (isActive ? `${styles.active} ` : styles.menu__item) }>
                             About  
                        </NavLink>
                    </li>
                    <li className={styles.menu__item}>
                        <NavLink to='/my-resume'
                            className={ ({isActive}) => (isActive ? `${styles.active} ` : styles.menu__item) }>
                            my resume 
                        </NavLink>
                    </li>
                    <li className={styles.menu__item}>
                        <NavLink to='/view-feedbacks'
                            className={ ({isActive}) => (isActive ? `${styles.active} ` : styles.menu__item) }>
                            find expert
                        </NavLink>
                    </li>
                    <li className={styles.menu__item}>
                        <NavLink to='/view-feedbacks'
                            className={ ({isActive}) => (isActive ? `${styles.active} ` : styles.menu__item) }   >
                            view feedbacks
                        </NavLink>
                    </li>
                    {isLogin ? 
                     (
                       
                       <li className={styles.menu__item}>
                       <button onClick={() =>dispatch(logout())}>
                           Logout
                       </button>
                   </li>
                    ) : 
                    (
                        <li className={styles.menu__item}>
                        <NavLink to='/login'
                            className={ ({isActive}) => (isActive ? `${styles.active} ` : styles.menu__item) } >
                            Login
                        </NavLink>
                    </li>
                     )}
                    {/* <li className={styles.menu__item}>
                        <NavLink to='/login'
                            className={ ({isActive}) => (isActive ? `${styles.active} ` : styles.menu__item) } >
                            Login
                        </NavLink>
                    </li> */}
                    {/* <li className={styles.menu__item}>
                        <span>
                            Logout
                        </span>
                    </li> */}
                 
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;