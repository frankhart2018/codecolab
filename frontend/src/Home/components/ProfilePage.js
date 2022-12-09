import {logoutUserThunk} from "../../services/thunks";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import * as React from "react";


const ProfilePage = () => {
    const { currentUser } = useSelector((state) => state.userDetails)
    console.log("On Profile page", currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logoutUserThunk());
    }
    const handleAllProj = () => {
        navigate("/all-projects")
    }
    return(
        <div>
            {/*<NavBar/>*/}
            {currentUser &&
                <>
                <div className="container">
                    <div className="row mt-4">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                            <div className="mt-3">
                                                <h4>Welcome {currentUser.name}</h4>
                                                <hr/>
                                                <Link to="/edit-profile">
                                                    <button className="btn btn-primary">Edit Profile</button>
                                                </Link>
                                                <Link to="/logout">
                                                    <button onClick={handleLogout} className="btn btn-outline-primary">Logout</button>
                                                </Link>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 mb-3">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {currentUser.name}
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Username</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {currentUser.username}
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {currentUser.email}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            }
        </div>
    )
}

export default ProfilePage;