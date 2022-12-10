import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {updateUserThunk, userDataThunk} from "../../services/thunks";
import {Link, useNavigate} from "react-router-dom";
import {Navigate} from "react-router";
import NavBar from "./NavBar";

const EditProfilePage = () => {
    const token = useSelector((state) => state.userDetails.token) || localStorage.getItem('token');
    const { currentUser } = useSelector((state) => state.userDetails)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [profileData, setProfileData] = useState({
        name: currentUser.name,
        username: currentUser.username,
        email: currentUser.email
    });
    const changeProfileField = async (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value
        });
    };
    const updateProfileData = async () => {
        await dispatch(updateUserThunk({currentUser, profileData}));
        await dispatch(userDataThunk({ token }));
        // navigate("/profile", {replace: true});
    }

    if (!currentUser) {
        return (<Navigate to={'/login'}/>)
    }

    return (
        <div>
            <NavBar/>
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
                                                <Link to="/profile">
                                                    <button onClick={updateProfileData}
                                                            className="btn btn-dark">Save
                                                    </button>
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
                                            <div className="col-sm-9">
                                                <input className="text-secondary form-control"
                                                       id="name"
                                                       name="name"
                                                       defaultValue={currentUser.name}
                                                       onChange={changeProfileField}>
                                                </input>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Username</h6>
                                            </div>
                                            <div className="col-sm-9">
                                                <input className="text-secondary form-control"
                                                       id="username"
                                                       name="username"
                                                       defaultValue={currentUser.username}
                                                       onChange={changeProfileField}>
                                                </input>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9">
                                                <input className="text-secondary form-control"
                                                       id="email"
                                                       name="email"
                                                       defaultValue={currentUser.email}
                                                       onChange={changeProfileField}>
                                                </input>
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

export default EditProfilePage;