import React from 'react';
import {Route,Routes } from "react-router-dom";

import Home from "../Pages/Home";
import Login from '../Pages/Login';
import SignupAsExpert from '../Pages/SignupAsExpert';
import SignupAsStudent from '../Pages/SignupAsStudent';

const CustomRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup-as-student" element={<SignupAsStudent />}/>
            <Route path="/signup-as-expert" element={<SignupAsExpert />}/>
        </Routes>
    );
}

export default CustomRoutes;