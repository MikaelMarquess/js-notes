import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ element: Component }) => {
    const isAuthenticated = localStorage.getItem('user');
    return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default PrivateRouter