import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import {
  Card,
  CardActions,
  CardHeader,
  Grid,
  IconButton,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import Button from "./form/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import SearchStackExchange from "./SearchStackExchange";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import StarRateIcon from "@mui/icons-material/StarRate";
import CardContent from "@mui/material/CardContent";
const API = process.env.REACT_APP_API_URL || "http://localhost:4000";

const HomePage = () => {
  const { currentUser } = useSelector((state) => state.userDetails);
  const [projects, setProjects] = useState([]);
  const [kProjects, setTopStarredProjects] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopProjectsHome = async () => {
      const k = 3;
      const res = await fetch(`${API}/api/get-top-starred-projects/${k}`);
      const data = await res.json();
      setTopStarredProjects(data?.projects);
      console.log("starred", kProjects);
    };
    fetchTopProjectsHome();
  }, []);
  useEffect(() => {
    const fetchProjectsHome = async () => {
      const res = await fetch(
        `${API}/api/get-all-projects/${currentUser?._id}`
      );
      const data = await res.json();
      setProjects(data?.projects);
      setUsername(currentUser?.username);
    };
    fetchProjectsHome();
  }, [currentUser?._id, currentUser?.username]);
  const slicedProjects = projects.reverse().slice(0, 3);

  const handleOpenProject = (id) => {
    navigate(`/code-editor/${id}`);
  };

  return (
    <>
      <NavBar />
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 5,
          pb: 3,
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
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            A collaborative code editor to allow you to code together over the
            internet
          </Typography>
        </Container>
      </Box>
      {!currentUser && (
        <Container sx={{ pt: 1, pb: 0 }} maxWidth="md" disableGutters={true}>
          <Box justifyContent={"center"} sx={{ pt: 0, pb: 0 }}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{ pb: 2 }}
            >
              <Link to="/sign-up" style={{ textDecoration: "none" }}>
                <Button variant="contained">Get Started</Button>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button variant="outlined">Login</Button>
              </Link>
            </Stack>
            <Container>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={12}>
                  <Typography
                    variant="h5"
                    component="div"
                    align="left"
                    gutterBottom
                  >
                    Check out our top rated projects!
                  </Typography>
                </Grid>
                <Stack direction="row" spacing={2} pl={4}>
                  {kProjects?.map((project) => (
                    <Card
                      sx={{
                        width: 275,
                        backgroundColor: "white",
                        "&:hover": {
                          backgroundColor: "lightgrey",
                          opacity: [0.9, 0.8, 0.7],
                        },
                      }}
                      onClick={() => handleOpenProject(project?._id)}
                    >
                      <CardHeader title={project.name} />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: 75,
                        }}
                      >
                        <img
                          src="/python_logo.png"
                          alt="python logo"
                          style={{ width: "100px" }}
                        ></img>
                      </div>
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {project.description}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                          <StarRateIcon color="starred" fontSize="medium" />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            pt={0.5}
                          >
                            Starred by {project.stars} users
                          </Typography>
                        </IconButton>
                      </CardActions>
                    </Card>
                  ))}
                </Stack>
              </Grid>
            </Container>
          </Box>
        </Container>
      )}
      {currentUser && (
        <Container
          sx={{ py: 5, pt: 1, pb: 0 }}
          maxWidth="md"
          disableGutters={true}
        >
          <Box justifyContent={"center"}>
            <Container>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={12}>
                  <Typography
                    variant="h3"
                    component="div"
                    align="left"
                    gutterBottom
                  >
                    <u>Welcome {username}!</u>
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    align="left"
                    gutterBottom
                  >
                    See your latest projects
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                    {slicedProjects?.map((project) => (
                      <ListItem
                        alignItems="flex-start"
                        sx={{
                          width: "100%",
                          backgroundColor: "white",
                          "&:hover": {
                            backgroundColor: "lightgrey",
                            opacity: [0.9, 0.8, 0.7],
                          },
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar src="/python_logo.png" alt="python logo" />
                        </ListItemAvatar>
                        <Link
                          to={`/code-editor/${project?._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <ListItemText
                            primary={project?.name}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {project?.description}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<NavigateNextIcon />}
                    style={{ float: "right" }}
                    href={"/all-projects"}
                  >
                    See all projects
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Container>
      )}
      <Container sx={{ py: 5 }} maxWidth="md">
        <Typography variant="h5" component="div" align="left" gutterBottom>
          Ask a question here. Get the top results from Stack Exchange
        </Typography>
        <SearchStackExchange />
      </Container>
    </>
  );
};

export default HomePage;
