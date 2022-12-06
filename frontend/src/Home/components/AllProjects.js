import { Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";

function AllProjects() {
  const { currentUser } = useSelector((state) => state.userDetails)
  console.log()
  return (
    <React.Fragment>
      <NavBar />
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            All Projects
          </Typography>
          <Typography variant="h4" component="h1" gutterBottom>
            {currentUser?.name}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AllProjects;
