import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import AuthService from '../services/auth.service';
import toastr from 'toastr';

const user = AuthService.getCurrentUser();

const ProtectedRoute = ({ children }) => {

    // return user ? children : <Navigate to="/" />; //the original way

    if (!user) {
      toastr.error('please login')
        return <Navigate to="/login" />;
    }

    return children

};

export default ProtectedRoute;
