import {logoutUserThunk} from "../../services/thunks";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router";
import NavBar from "./NavBar";
import * as React from "react";


const ProfilePage = () => {
    const { currentUser } = useSelector((state) => state.userDetails)
    console.log("On Profile page", currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logoutUserThunk());
        navigate("/");
    }
    const handleAllProj = () => {
        navigate("/all-projects")
    }
    return(
        <div>
            <NavBar/>
            <h1>Welcome {currentUser.username}</h1>
            <button onClick={handleLogout}>Sign Out</button>
            <button onClick={handleAllProj}>Go to all projects</button>
        </div>
    )
}

export default ProfilePage;