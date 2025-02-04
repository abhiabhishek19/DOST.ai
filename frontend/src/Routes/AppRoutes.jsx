import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import Register from "../Pages/RegisterPage";
import HomePage from "../Pages/HomePage";
import Project from "../Pages/Project";
import UserAuth from "../auth/userAuth";
const AppRoutes = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<UserAuth><HomePage/></UserAuth>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/project" element={<UserAuth><Project/></UserAuth>} />
        </Routes>
        </BrowserRouter>
    );
    }

export default AppRoutes;