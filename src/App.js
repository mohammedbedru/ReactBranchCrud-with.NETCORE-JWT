import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AddBranch from "./components/AddBranch";
import BranchList from "./components/BranchList";
import BranchDetails from "./components/BranchDetails";
import EditBranch from "./components/EditBranch";
import Profile from "./components/Profile";
import AuthVerify from "./common/AuthVerify";
import ProtectedRoute from "./common/ProtectedRoute";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css'; // Import Toastr CSS

const App = () => {

  toastr.options = {
    closeButton: true,
    // progressBar: true,
  };

  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      // setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    } else {
      // setShowAdminBoard(false);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          jwt branch
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/dashboard"} className="nav-link">
              Dashboard
            </Link>
          </li>

          {currentUser && (
            <>
              <li className="nav-item">
                <Link to={"/branches"} className="nav-link">
                  Branch list
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add_branch"} className="nav-link">
                  Add branch
                </Link>
              </li>
            </>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>  {/* route guard*/}
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* <Route path="/branches" element={<BranchList />} /> */}

          <Route path="/branches" element={<ProtectedRoute> <BranchList /> </ProtectedRoute>} />
          <Route path="/add_branch" element={<ProtectedRoute> <AddBranch /> </ProtectedRoute>} />
          <Route path="/branches/:id" element={<ProtectedRoute> <BranchDetails /> </ProtectedRoute>} />
          <Route path="/branches/edit/:id" element={<ProtectedRoute> <EditBranch /> </ProtectedRoute>} />

          {/* <Route path="/branches/:id" element={<BranchDetails />} /> */}
          {/* <Route path="/branches/edit/:id" element={<EditBranch />} /> */}
        </Routes>
      </div>
      <AuthVerify logOut={logOut} />
    </div>
  );
};

export default App;
