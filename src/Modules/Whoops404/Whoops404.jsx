import {Alert, AlertTitle, Button} from "@mui/material";
import React                       from "react";
import {useTranslation}            from "react-i18next";
import {useNavigate}               from "react-router-dom";
import {CONTENT, ROUTE_URL}        from "../../Constants";
import "./Styles/Whoops404.scss";

export const Whoops404 = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const handleHome = () => navigate(ROUTE_URL.HOME);
  return (
      <Alert
          severity="info"
          action={
            <Button variant="contained" onClick={handleHome}>
              {t(CONTENT.ERROR_404.BACK_TO_HOME)}
            </Button>
          }
          className="not-found-alert"
      >
        <AlertTitle>
          <strong>{t(CONTENT.ERROR_404.TITLE)}</strong>
        </AlertTitle>
        {t(CONTENT.ERROR_404.DESCRIPTION)}
      </Alert>
  );
};
