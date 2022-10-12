import React,{useState} from 'react';
import { Link } from 'react-router-dom';

//3rd party packages
import axios from "axios";

//keys
import { BASE_URL } from '../Keys/Keys';

//css
import styles from "./SignupAsExpert.module.css";

const SignupAsExpert = () => {

    const [signupDetails,setSignupDetails] = useState({
        emailID:"",
        password:"",
        confirmPassword:"",
        signupMessage : "",
        linkedinURL : ""
    })

    const handleSignupDetailsChange = e =>{
        e.preventDefault();
        setSignupDetails({
            ...signupDetails,
            [e.target.name ] : e.target.value
        })
    }
    const handleSignupDetailsSubmit = (e) =>{
        e.preventDefault();
        
        const data ={ 
            emailID: signupDetails.emailID,
            password : signupDetails.password,
            confirmPassword : signupDetails.confirmPassword,
            linkedinURL : signupDetails.linkedinURL,
            role : 1
        }
        // console.log({signupDetailsBeforePosting: data});

        axios.post(`${BASE_URL}/api/users/signup-user`,data)
        .then((res) =>{
            setSignupDetails({...signupDetails,signupMessage : res.data.message})
            // console.log({response : res.data});
        })
        .catch(err =>{
            setSignupDetails({...setSignupDetails,signupMessage: err})
        })

    }
    // useEffect(() =>{
       
    // },[])

    return (
        <div className={styles.container__parent}>
            <div className={styles.container}>
                <h1 className={styles.container__title}>Signup as Expert</h1>
                <h3 className={styles.container__subtitle}>signup,review other resumes with your expertise and shape the students future</h3>
                <h4 className={styles.container__subtitle}>or <Link to="/signup-as-student">signup as Student</Link> for experts resume</h4>
                {/* <div className={styles.inputs}> */}
                    <form onSubmit={handleSignupDetailsSubmit} className={styles.inputs}>
                    {/* <div className={styles.}></div> */}
                        <div className={styles.input__item}>
                            <label className={styles.input__label}>EmailID</label>
                            <input name="emailID"  className={styles.input__field} placeholder="enter emailID" value={signupDetails.emailID} onChange={handleSignupDetailsChange} type="text"/>
                        </div>
                        <div className={styles.input__item}>
                            <label className={styles.input__label}>Password</label>
                            <input name="password"  className={styles.input__field} placeholder="enter password" value={signupDetails.password} onChange={handleSignupDetailsChange} type="password"/>
                        </div>
                        <div className={styles.input__item}>
                            <label className={styles.input__label}>Confirm Password</label>
                            <input name="confirmPassword"  className={styles.input__field} placeholder="enter confirm password" value={signupDetails.confirmPassword} onChange={handleSignupDetailsChange} type="password"/>
                        </div>
                        <div className={styles.input__item}>
                            <label className={styles.input__label}>Linkedin </label>
                            <input name="linkedinURL"  className={styles.input__field} placeholder="enter linkedin profile url here, ex: https://linkedin.com/in/profilename" value={signupDetails.linkedinURL} onChange={handleSignupDetailsChange} type="text"/>
                        </div>
                        <button className={styles.container__submit} type="submit" >signup as expert</button>
                    </form>
                {/* </div> */}
                <h4 className={styles.container__subtitle}>Already have an account? <Link to="/login">Login</Link> </h4>
                <h3 className={styles.container__subtitle}>{signupDetails.signupMessage} </h3>
            </div>
        </div>
    );
}

export default SignupAsExpert;