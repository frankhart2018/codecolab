import { Card, Container, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreateButton from "./CreateButton";
import NavBar from "./NavBar";
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import { useNavigate } from "react-router";

function AllProjects() {
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

  const handleOpenProject = (id) => {
    console.log("project id", id)
    navigate(`/code-editor/${id}`);
  }
  const onCreateProject = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/get-all-projects/${currentUser?._id}`);
    const data = await res.json();
    setProjects(data?.projects);

  }
  return (
    <Grid container>
      <NavBar />
      <Container>
        <Grid container sx={{ paddingTop: 10 }} spacing={2}>
          <Grid item xs={12} md={12} lg={12} >
            <Typography variant="h2" component="h1" gutterBottom style={{ paddingTop: 10 }}>
              Welcome, <u>{currentUser?.name}</u>
            </Typography>

          </Grid>
          <Grid item xs={6} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              <b>All Projects</b>
            </Typography>
            <Typography variant="h5"  >
              {username}
            </Typography>
          </Grid>

          <Grid item xs={6} md={6} spacing={2}>
            <CreateButton owner_id={currentUser?._id} handleProjectList={onCreateProject} />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={12}  >
            <Divider style={{ padding: 2 }} gutterBottom />
            <div style={{ display: "flex", padding: 20, flexWrap: "wrap", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              {projects?.map((project) => (
                <div style={{
                  padding: 15
                }}>
                  <Card sx={{
                    maxWidth: 345, width: 300,
                    height: 300,
                  }}
                    onClick={() => handleOpenProject(project?._id)} >
                    <CardActionArea>
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200 }}>
                        <img src="/python_logo.png" alt="python logo" style={{ width: '100px' }}></img>
                      </div>
                      <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                          {project?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {project?.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              ))}
            </div>
          </Grid>
        </Grid >
      </Container>
    </Grid >
  );
}

export default AllProjects;
