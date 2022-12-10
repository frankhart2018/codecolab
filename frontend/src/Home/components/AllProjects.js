import { Card, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CreateButton from "./CreateButton";
import NavBar from "./NavBar";
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';

function AllProjects() {
  const { currentUser } = useSelector((state) => state.userDetails)
  console.log("currentUser", currentUser)
  const [projects, setProjects] = React.useState([]);
  const [username, setUsername] = React.useState("");
  React.useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/get-all-projects/${currentUser?._id}`);
      console.log("res", res)
      const data = await res.json();
      setProjects(data?.projects);
      setUsername(currentUser?.username);
    };
    fetchProjects();
  }, [currentUser?._id, currentUser?.username]);
  console.log("projects", projects)

  const handleOpenProject = (id) => {
    console.log("project id", id)
  }
  const onCreateProject = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/get-all-projects/${currentUser?._id}`);
    console.log("res", res)
    const data = await res.json();
    setProjects(data?.projects);

  }
  return (
    <Grid container>
      <NavBar />
      <Grid container spacing={4}>
        <Grid item xs={12} md={12} spacing={4}>
          <Typography variant="h2" component="h1" gutterBottom style={{ marginLeft: '15px', paddingTop: 10 }}>
            Welcome, <u>{currentUser?.name}</u>
          </Typography>

        </Grid>
        <Grid item xs={6} md={6} spacing={4}>
          <Typography variant="h4" component="h1" style={{ marginLeft: '15px' }} gutterBottom>
            <b>All Projects</b>
          </Typography>
          <Typography variant="h5" style={{ marginLeft: '15px' }} >
            {username}
          </Typography>
        </Grid>

        <Grid item xs={6} md={6} spacing={4}>
          <CreateButton owner_id={currentUser?._id} handleProjectList={onCreateProject} />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12} spacing={2} >
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
    </Grid >
  );
}

export default AllProjects;
