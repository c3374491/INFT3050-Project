import React from 'react';
import { Navigate } from 'react-router-dom';
import HandleCookies from '../helpers/HandleCookies';

const EmployeRoute = ({ children }) => {
    const { authToken } = HandleCookies();

    // If the user is not connected or not admin, we redirect to the log in page
    if (!authToken || !authToken.isEmploye) {
        return <Navigate to="/login" replace />;
    }

    // If the user is an admin we redirect to the right route
    return children;
};

export default EmployeRoute;
