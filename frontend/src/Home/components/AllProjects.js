import { Grid, Typography } from "@mui/material";
import React from "react";
import {useDispatch, useSelector } from "react-redux";
import {logoutUserThunk} from "../../services/thunks";
import {Navigate, useNavigate} from "react-router";

function AllProjects() {
    const { currentUser } = useSelector((state) => state.userDetails)
    console.log("On All Projects", currentUser)

    return (
        <React.Fragment>
            {/*<NavBar />*/}
            {
                currentUser &&
                <>
                <h1>Welcome {currentUser.username}</h1>
                </>
            }
            <div>All projects</div>
        </React.Fragment>
    )
}

export default AllProjects;
