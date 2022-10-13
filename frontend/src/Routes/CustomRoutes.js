import React from 'react';
import {Route,Routes } from "react-router-dom";


import Home from "../Pages/Home";
import Login from '../Pages/Login';
import SignupAsExpert from '../Pages/SignupAsExpert';
import SignupAsStudent from '../Pages/SignupAsStudent';
import CreateResume from '../Pages/CreateResume';
import ProtectedRoute from '../Components/ProtectedRoute';

const CustomRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route exact path="/login" element={<Login />}/>
            <Route path="/signup-as-student" element={<SignupAsStudent />}/>
            <Route path="/signup-as-expert" element={<SignupAsExpert />}/>
            {/* <Route path="/create-resume" element={<CreateResume />}/> */}
            <Route exact path="/create-resume" element={
                <ProtectedRoute >
                    <CreateResume />
                </ProtectedRoute>
            }/>
           
        </Routes>
    );
}

export default CustomRoutes;