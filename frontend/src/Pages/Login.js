
import React,{useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

import { BASE_URL } from '../Keys/Keys';

import styles from "./Login.module.css";
import { login } from '../store/authenticateSlice';


const Login = (props) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.authenticator.isAuthenticated);


    const [loginDetails,setLoginDetails] = useState({
        emailID : "",
        password : "",
        loginMessage:""
    })

    const handleLoginDetailsSubmit = e =>{
        e.preventDefault();
        const data = {
            emailID : loginDetails.emailID,
            password : loginDetails.password
        }
        axios.post(`${BASE_URL}/api/users/login-user`,data)
        .then(res =>{
            console.log({resp : res.data});
            setLoginDetails({...loginDetails, loginMessage : res.data.message })
            dispatch(login({jwtToken : res.data.token}))
        //    { <Navigate to="/create-resume" replace />}
        //    props.history.push("/create-resume")
        })
        .catch(err => console.log(err))
    }

    const handleLoginDetailsChange = e => {
        e.preventDefault();
        setLoginDetails({
            ...loginDetails,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div className={styles.container__parent}>
           {isAuthenticated &&  <Navigate to="/create-resume" replace />}
            <div className={styles.container}>
                <h1 className={styles.container__title}>Login</h1>
                <h3 className={styles.container__subtitle}>Login,Upload your resume and get experts review  as student </h3>
                <h3 className={styles.container__subtitle}>OR review others resume as expert </h3>
                {/* <h4 className={styles.container__subtitle}>or <Link to="/signup-as-expert">signup as Expert</Link> to review resume</h4> */}
                {/* <div className={styles.inputs}> */}
                    <form onSubmit={handleLoginDetailsSubmit} className={styles.inputs}>
                    {/* <div className={styles.}></div> */}
                        <div className={styles.input__item}>
                            <label className={styles.input__label}>EmailID</label>
                            <input name="emailID"  className={styles.input__field} placeholder="enter emailID" value={loginDetails.emailID} onChange={handleLoginDetailsChange} type="text"/>
                        </div>
                        <div className={styles.input__item}>
                            <label className={styles.input__label}>Password</label>
                            <input name="password"  className={styles.input__field} placeholder="enter password" value={loginDetails.password} onChange={handleLoginDetailsChange} type="password"/>
                        </div>
                        <button className={styles.container__submit} type="submit" >Login</button>
                    </form>
                {/* </div> */}
                <h4 className={styles.container__subtitle}>Don't have an account? <Link to="/signup-as-student">Signup as Student</Link> </h4>
                <h4 className={styles.container__subtitle}>Don't have an account? <Link to="/signup-as-expert">Signup as Expert</Link> </h4>
                <h3 className={styles.container__subtitle}>{loginDetails.loginMessage} </h3>
            </div>
        </div>
    );
}

export default Login;