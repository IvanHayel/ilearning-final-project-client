import {Container, Divider, Typography} from "@mui/material";
import React                            from "react";
import "./Styles/About.scss";

export const About = () => (
    <Container className="about-container">
      <Typography color="primary" className="about-title" variant="h3">
        ABOUT
      </Typography>
      <Divider variant="middle" color="text.primary" />
      <Typography color="secondary" className="about-text" variant="h5">
        <strong>ILearning Course Project</strong>
      </Typography>
      <Divider variant="middle" color="text.primary" />
    </Container>
);
