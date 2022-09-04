import {Container, Divider, Typography} from "@mui/material";
import React                            from "react";
import "./Styles/About.scss";
import {useTranslation}                 from "react-i18next";
import {CONTENT}                        from "../../Constants";

export const About = () => {
  const {t} = useTranslation();
  return (
      <Container className="about-container">
        <Typography color="primary" className="about-title" variant="h3">
          {t(CONTENT.ABOUT.TITLE)}
        </Typography>
        <Divider variant="middle" color="text.primary" />
        <Typography color="secondary" className="about-text" variant="h5">
          <strong>{t(CONTENT.ABOUT.TEXT)}</strong>
        </Typography>
        <Divider variant="middle" color="text.primary" />
      </Container>
  );
};
