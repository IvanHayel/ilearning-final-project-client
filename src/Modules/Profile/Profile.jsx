import {Container, Grid, Typography} from "@mui/material";
import {observer}                    from "mobx-react-lite";
import React                         from "react";
import {useStore}                    from "../../Hooks";
import "./Styles/Profile.scss";

export const Profile = observer(() => {
  const authenticationStore = useStore('authenticationStore');
  const currentUser = authenticationStore.getCurrentUser();
  return (
      <Container className="profile-container">
        <Grid container>
          <Grid item xs={12}>
            <Typography color="primary" variant="h3" className="profile-title">
              PROFILE
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="secondary" variant="h4"
                        className="profile-subtitle">
              Personal Information
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className="profile-text">
              Username: {currentUser.username}
            </Typography>
            <Typography variant="h6" className="profile-text">
              Email: {currentUser.email}
            </Typography>
            <Typography variant="h6" className="profile-text">
              Roles:{" "}
              {currentUser.roles.map((role) => role.substring(5)).join(", ")}
            </Typography>
          </Grid>
        </Grid>
      </Container>
  );
});
