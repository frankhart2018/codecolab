import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {updateUserThunk, userDataThunk} from "../../services/thunks";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";
import {Card, CardContent, Divider, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const EditProfilePage = () => {
    const token = useSelector((state) => state.userDetails.token) || localStorage.getItem('token');
    const { currentUser } = useSelector((state) => state.userDetails)
    const dispatch = useDispatch()

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
    }

    const WelcomeCard = () => {
        return (
            <>
                <Box sx={{ pt: 10 }}>
                    <Card variant="outlined" align="center">
                        <CardContent>
                            <Typography sx={{fontSize: 24}} component="div">
                                Welcome {currentUser.name}
                            </Typography>
                        </CardContent>
                        <Box justifyContent={"center"} pb={2}>
                        <Link to="/profile" style={{ textDecoration: 'none'}}>
                            <Button onClick={updateProfileData} variant="contained">
                                Save
                            </Button>
                        </Link>
                        </Box>
                    </Card>
                </Box>
            </>
        )
    }

    return (
        <div>
            {currentUser &&
                <>
                    <Box justifyContent={"center"}>
                        <Container>
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={4}>
                                    <WelcomeCard>xs=6 md=4</WelcomeCard>
                                </Grid>
                                <Grid item xs={6} md={8}>
                                    <Box sx={{ pt: 10 }}>
                                        <Card variant="outlined" align="center">
                                            <CardContent>
                                                <Typography sx={{fontSize: 18}} component="div">
                                                    <Grid container spacing={2} pb={2}>
                                                        <Grid item xs={6} md={4} textAlign='left'>
                                                            Name
                                                        </Grid>
                                                        <Grid item xs={6} md={8} textAlign='left'>
                                                            <input
                                                                id="name"
                                                                name="name"
                                                                defaultValue={currentUser.name}
                                                                onChange={changeProfileField}>
                                                            </input>
                                                        </Grid>
                                                    </Grid>
                                                    <Divider/>
                                                    <Grid container spacing={2} pt={2} pb={2}>
                                                        <Grid item xs={6} md={4} textAlign='left'>
                                                            Username
                                                        </Grid>
                                                        <Grid item xs={6} md={8} textAlign='left'>
                                                            <input
                                                                id="username"
                                                                name="username"
                                                                defaultValue={currentUser.username}
                                                                onChange={changeProfileField}>
                                                            </input>
                                                        </Grid>
                                                    </Grid>
                                                    <Divider/>
                                                    <Grid container spacing={2} pt={2}>
                                                        <Grid item xs={6} md={4} textAlign='left'>
                                                            Email
                                                        </Grid>
                                                        <Grid item xs={6} md={8} textAlign='left'>
                                                            <input
                                                                id="email"
                                                                name="email"
                                                                defaultValue={currentUser.email}
                                                                onChange={changeProfileField}>
                                                            </input>
                                                        </Grid>
                                                    </Grid>
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </>
            }
        </div>
    )

}

export default EditProfilePage;