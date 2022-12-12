import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { updateUserThunk, userDataThunk } from "../../services/thunks";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Box from "@mui/material/Box";
import { Avatar, Card, CardContent, Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 15) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar({ name }) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            width: 100, height: 100,
        },
    };
}


const EditProfilePage = () => {
    const token = useSelector((state) => state.userDetails.token) || localStorage.getItem('token');
    const { currentUser } = useSelector((state) => state.userDetails)
    const [email, setEmail] = useState("");
    const [emailErrorText, setEmailErrorText] = useState("");
    const [profileName, setProfilename] = useState("");
    const [profileNameErrorText, setprofileNameErrorText] = useState("");
    const [username, setUsername] = useState("");
    const [usernameErrorText, setUsernameErrorText] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            setEmail(currentUser.email)
            setProfilename(currentUser.name)
            setUsername(currentUser.username)
        }
    }
        , [currentUser])


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setEmailErrorText("Please enter email");
        } else {
            setEmailErrorText("");
        }
        if (!profileName) {
            setprofileNameErrorText("Please enter name");
        }
        else {
            setprofileNameErrorText("");
        }
        if (!username) {
            setUsernameErrorText("Please enter username");
        }
        else {
            setUsernameErrorText("");
        }

        if (email && profileName && username) {
            await updateProfileData();
        }

    };



    const updateProfileData = async () => {
        const profileData = {
            email,
            name: profileName,
            username,
        };
        await dispatch(updateUserThunk({ currentUser, profileData }));
        await dispatch(userDataThunk({ token }));
        navigate("/profile", { replace: true });
    }


    const WelcomeCard = () => {
        return (<>
            <Box sx={{ p: 1 }}>
                <Card variant="outlined" align="center" >
                    <CardContent>
                        <Avatar
                            alt="profile picture"
                            {...stringAvatar({ name: currentUser.name })}
                        />
                        <Typography sx={{ fontSize: 24 }} component="div">
                            {currentUser.name}
                        </Typography>
                    </CardContent>
                    <Box justifyContent={"center"}>
                        <Stack
                            justifyContent={"center"}
                            direction="row"
                            spacing={2}
                            pb={2}
                        >
                            <Link style={{ textDecoration: 'none' }}>
                                <Button onClick={handleSubmit} variant="contained">
                                    Save
                                </Button>
                            </Link>
                        </Stack>
                    </Box>
                </Card>
            </Box >
        </>


        )
    }

    return (
        <div>
            <NavBar />
            {currentUser &&
                <>
                    <Box justifyContent={"center"}>
                        <Container maxWidth="lg">
                            <Grid container spacing={4} sx={{ paddingTop: 5 }}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Typography variant="h1" component="div" align="left" gutterBottom>
                                        <u>Edit Profile</u>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} >
                                    <Typography variant="body1" component="div" align="left" gutterBottom>
                                        User information
                                    </Typography>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12} lg={4} sm={12} md={4} >
                                    <WelcomeCard />
                                </Grid>
                                <Grid item xs={12} lg={8} sm={12} md={8} >
                                    <Box sx={{ pt: 1 }}>
                                        <Card variant="outlined" align="center">
                                            <CardContent>
                                                <Typography component="div">
                                                    <Grid container spacing={2} pb={2}>
                                                        <Grid item xs={6} md={4} textAlign='left' sx={{ display: 'flex', alignItems: 'center' }}>
                                                            Name*
                                                        </Grid>
                                                        <Grid item xs={6} md={8} textAlign='left'>
                                                            <TextField
                                                                variant="outlined"
                                                                margin="normal"
                                                                required
                                                                type="text"
                                                                fullWidth
                                                                name="profileName"
                                                                value={profileName}
                                                                error={!!profileNameErrorText}
                                                                helperText={profileNameErrorText}
                                                                onChange={(e) => setProfilename(e.target.value)}

                                                            />

                                                        </Grid>
                                                    </Grid>
                                                    <Divider />
                                                    <Grid container spacing={2} pt={2} pb={2}>
                                                        <Grid item xs={6} md={4} textAlign='left' sx={{ display: 'flex', alignItems: 'center' }}>
                                                            Username*
                                                        </Grid>
                                                        <Grid item xs={6} md={8} textAlign='left'>
                                                            <TextField
                                                                variant="outlined"
                                                                margin="normal"
                                                                required
                                                                type="text"
                                                                fullWidth
                                                                id="username"
                                                                name="username"
                                                                value={username}
                                                                error={!!usernameErrorText}
                                                                helperText={usernameErrorText}
                                                                onChange={e => setUsername(e.target.value)}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Divider />
                                                    <Grid container spacing={2} pt={2}>
                                                        <Grid item xs={6} md={4} textAlign='left' sx={{ display: 'flex', alignItems: 'center' }}>
                                                            Email*
                                                        </Grid>
                                                        <Grid item xs={6} md={8} textAlign='left'>
                                                            <TextField
                                                                variant="outlined"
                                                                margin="normal"
                                                                required
                                                                type="email"
                                                                fullWidth
                                                                id="email"
                                                                name="email"
                                                                value={email}
                                                                autoComplete="email"
                                                                error={!!emailErrorText}
                                                                helperText={emailErrorText}
                                                                onChange={e => setEmail(e.target.value)}
                                                            />


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