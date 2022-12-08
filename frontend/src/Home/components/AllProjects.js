import { Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import {useDispatch, useSelector } from "react-redux";
import {logoutUserThunk} from "../../services/thunks";
import {Navigate, useNavigate} from "react-router";

function AllProjects() {
    const { currentUser } = useSelector((state) => state.userDetails)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    console.log("On All Projects", currentUser)
    const handleLogout = () => {
        dispatch(logoutUserThunk());
        navigate("/login");
    }
    return (
        <React.Fragment>
            <NavBar />
            {
                currentUser &&
                <>
                <h1>Welcome {currentUser.username}</h1>
                <button onClick={handleLogout}>Sign Out</button>
                </>
            }
            <div>All projects</div>
        </React.Fragment>
    )
}

export default AllProjects;
