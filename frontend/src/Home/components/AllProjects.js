import React from "react";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";

function AllProjects() {
    const { currentUser } = useSelector((state) => state.userDetails)
    console.log("currentUser", currentUser)
    return (
        <React.Fragment>
            <NavBar />
            {
                currentUser &&
                <h1>Welcome {currentUser.username}</h1>
            }
            <div>All projects</div>
        </React.Fragment>
    )
}

export default AllProjects;