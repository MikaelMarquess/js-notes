import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/home/index"
import RegisterScreen from "./screens/auth/register";
import LoginScreen from "./screens/auth/login";
import NotesScreen from "./screens/notes/index";
import UserEditScreen from "./screens/auth/edit_user";

import PrivateRouter from "./components/auth/private_routers";

const RoutesScreen = () => {
    return(
    <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/register" element={<RegisterScreen/>}/>
        <Route exact path="/login" element={<LoginScreen/>}/>
        <Route path="/notes" element={<PrivateRouter element={<NotesScreen />} />} />
        <Route path="/users/edit" element={<PrivateRouter element={<UserEditScreen />} />} />
    </Routes>
    </BrowserRouter>
    )
}

export default RoutesScreen

