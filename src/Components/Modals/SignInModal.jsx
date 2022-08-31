import {AccountCircle}                from "@mui/icons-material";
import GitHubIcon                     from '@mui/icons-material/GitHub';
import KeyIcon                        from "@mui/icons-material/Key";
import LoginIcon                      from "@mui/icons-material/Login";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
}                                     from "@mui/material";
import {Form, Formik}                 from "formik";
import {observer}                     from "mobx-react-lite";
import React, {useState}              from "react";
import {useTranslation}               from "react-i18next";
import {useNavigate}                  from "react-router-dom";
import * as Yup                       from "yup";
import {AUTH_API, CONTENT, ROUTE_URL} from "../../Constants";
import {isAuthenticated, signIn}      from "../../Services";
import {Copyright}                    from "../index";
import "./Styles/Modal.scss";

export const SignInModal = observer(() => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const validationSchema = Yup.object({
    username: Yup.string(t(CONTENT.VALIDATION.USERNAME.ENTER))
    .min(3, t(CONTENT.VALIDATION.USERNAME.SIZE))
    .required(t(CONTENT.VALIDATION.USERNAME.REQUIRED)),
    password: Yup.string(t(CONTENT.VALIDATION.PASSWORD.ENTER))
    .min(6, t(CONTENT.VALIDATION.PASSWORD.SIZE))
    .required(t(CONTENT.VALIDATION.PASSWORD.REQUIRED)),
  });
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleSignIn = async (values) => {
    await signIn(values);
    isAuthenticated() && navigate(ROUTE_URL.HOME) && handleModalClose();
  };
  return (
      <>
        <IconButton color="inherit" onClick={handleModalOpen} size="medium">
          <LoginIcon fontSize="large" />
        </IconButton>
        <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
        >
          <Box className="modal-main-box"
               sx={{backgroundColor: "background.default"}}>
            <Typography
                color="primary"
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="center"
                fontWeight="bold"
            >
              {t(CONTENT.FORM.SIGN_IN)}
            </Typography>
            <Formik
                initialValues={{username: "", password: ""}}
                onSubmit={handleSignIn}
                validationSchema={validationSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                  <Form className="modal-form">
                    <TextField
                        type="username"
                        name="username"
                        label={t(CONTENT.FORM.USERNAME)}
                        variant="outlined"
                        required={true}
                        onChange={handleChange("username")}
                        onBlur={handleBlur("username")}
                        value={values.username}
                        className="modal-input-field"
                        InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle />
                              </InputAdornment>
                          ),
                        }}
                    />
                    {errors.username && touched.username && (
                        <Typography color="error" variant="caption"
                                    className="modal-error-message">
                          {errors.username.toString()}
                        </Typography>
                    )}
                    <TextField
                        type="password"
                        name="password"
                        autoComplete="on"
                        label={t(CONTENT.FORM.PASSWORD)}
                        variant="outlined"
                        required={true}
                        onChange={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        className="modal-input-field"
                        InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                <KeyIcon />
                              </InputAdornment>
                          ),
                        }}
                    />
                    {errors.password && touched.password && (
                        <Typography color="error" variant="caption"
                                    className="modal-error-message">
                          {errors.password.toString()}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        endIcon={<LoginIcon />}
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                        className="modal-confirm-button"
                    >
                      <strong>{t(CONTENT.FORM.SIGN_IN)}</strong>
                    </Button>
                  </Form>
              )}
            </Formik>
            <Box className="social-buttons">
              <IconButton size="medium" href={AUTH_API.OAUTH2.GITHUB}>
                <GitHubIcon fontSize="large" />
              </IconButton>
            </Box>
            <Copyright />
          </Box>
        </Modal>
      </>
  );
});
