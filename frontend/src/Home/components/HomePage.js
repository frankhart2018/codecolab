import React, {useEffect, useState} from "react";
import Container from '@mui/material/Container';
import {Divider, Grid, ListItem, Stack, Typography} from "@mui/material";
import Button from "./form/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import SearchStackExchange from "./SearchStackExchange";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import NavBar from "./NavBar";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import {useNavigate} from "react-router";

const HomePage = () => {
    const { currentUser } = useSelector((state) => state.userDetails)
    const [projects, setProjects] = useState([]);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProjects = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/get-all-projects/${currentUser?._id}`);
            const data = await res.json();
            setProjects(data?.projects);
            setUsername(currentUser?.username);
        };
        fetchProjects();
    }, [currentUser?._id, currentUser?.username]);
    const slicedProjects = projects.reverse().slice(0, 2);

    const handleOpenProject = (id) => {
        navigate(`/code-editor/${id}`);
    }

    return (
        <>
            <NavBar/>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        CODE. ANYWHERE. ANYTIME.
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        A collaborative code editor to allow you to code together over the internet
                    </Typography>
                    {!currentUser &&
                        <>
                        <Stack
                            sx={{pt: 4}}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                                <Link to="/sign-up" style={{textDecoration: 'none'}}>
                                    <Button variant="contained">Get Started</Button>
                                </Link>
                                <Link to="/login" style={{textDecoration: 'none'}}>
                                    <Button variant="outlined">Login</Button>
                                </Link>
                        </Stack>
                        </>
                    }
                </Container>
            </Box>
            {currentUser &&
                <Container sx={{py: 5, pt:0, pb:0}} maxWidth="md" disableGutters={true}>
                    <Box justifyContent={"center"}>
                        <Container>
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Typography variant="h3" component="div" align="left" gutterBottom>
                                        <u>Welcome {currentUser.name}!</u>
                                    </Typography>
                                    <Typography variant="h5" component="div" align="left" gutterBottom>
                                        See your latest projects
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                    <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                        {slicedProjects?.map((project) => (
                            <Link to={`/code-editor/${project?._id}`} style={{ textDecoration: 'none' }}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/python_logo.png" alt="python logo" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={project?.name}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{display: 'inline'}}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {project?.description}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            </Link>
                        ))}
                    </List>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<NavigateNextIcon/>}
                        style={{float: 'right'}}
                        href={'/all-projects'}
                    >
                        See all projects
                    </Button>
                                </Grid>
                        </Grid>
                    </Container>
                </Box>
                </Container>
            }
            <Container sx={{ py: 5 }} maxWidth="md">
                <Typography variant="h5" component="div" align="left" gutterBottom>
                    Ask a question here. Get the top results from Stack Exchange
                </Typography>
                <SearchStackExchange/>
            </Container>
        </>
    )
}

export default HomePage;