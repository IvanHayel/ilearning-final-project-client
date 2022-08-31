import {AccountCircle}        from "@mui/icons-material";
import CheckIcon              from "@mui/icons-material/Check";
import EmailIcon              from "@mui/icons-material/Email";
import HowToRegIcon           from "@mui/icons-material/HowToReg";
import KeyIcon                from "@mui/icons-material/Key";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
}                             from "@mui/material";
import {Form, Formik}         from "formik";
import {observer}             from "mobx-react";
import React, {useState}      from "react";
import {useTranslation}       from "react-i18next";
import * as Yup               from "yup";
import {CONTENT, HTTP_STATUS} from "../../Constants";
import {signUp}               from "../../Services";
import {Copyright}            from "../index";
import "./Styles/Modal.scss";

export const SignUpModal = observer(() => {
  const {t} = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);
  const validationSchema = Yup.object({
    username: Yup.string(t(CONTENT.VALIDATION.USERNAME.ENTER))
    .min(3, t(CONTENT.VALIDATION.USERNAME.SIZE))
    .required(t(CONTENT.VALIDATION.USERNAME.REQUIRED)),
    email: Yup.string(t(CONTENT.VALIDATION.EMAIL.ENTER))
    .email(t(CONTENT.VALIDATION.EMAIL.VALID))
    .required(t(CONTENT.VALIDATION.EMAIL.REQUIRED)),
    password: Yup.string(t(CONTENT.VALIDATION.PASSWORD.ENTER))
    .min(6, t(CONTENT.VALIDATION.PASSWORD.SIZE))
    .required(t(CONTENT.VALIDATION.PASSWORD.REQUIRED)),
    confirmPassword: Yup.string(t(CONTENT.VALIDATION.CONFIRM_PASSWORD.ENTER))
    .oneOf([Yup.ref("password"), null],
        t(CONTENT.VALIDATION.CONFIRM_PASSWORD.MATCH))
    .required(t(CONTENT.VALIDATION.CONFIRM_PASSWORD.REQUIRED)),
  });
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleSignUp = async (values) => {
    const response = await signUp(values);
    response.status === HTTP_STATUS.OK && handleModalClose();
  };
  return (
      <>
        <IconButton onClick={handleModalOpen} size="medium" color="inherit">
          <HowToRegIcon fontSize="large" />
        </IconButton>
        <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
        >
          <Box className="modal-main-box"
               sx={{backgroundColor: "background.default"}}>
            <Typography
                id="modal-modal-title"
                color="primary"
                variant="h6"
                component="h2"
                textAlign="center"
                fontWeight="bold"
            >
              {t(CONTENT.FORM.SIGN_UP)}
            </Typography>
            <Formik
                initialValues={{
                  username: "",
                  password: "",
                  email: "",
                  confirmPassword: "",
                }}
                onSubmit={handleSignUp}
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
                        type="email"
                        name="email"
                        label={t(CONTENT.FORM.EMAIL)}
                        variant="outlined"
                        required={true}
                        onChange={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        className="modal-input-field"
                        InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon />
                              </InputAdornment>
                          ),
                        }}
                    />
                    {errors.email && touched.email && (
                        <Typography color="error" variant="caption"
                                    className="modal-error-message">
                          {errors.email.toString()}
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
                    <TextField
                        type="password"
                        name="confirmPassword"
                        autoComplete="on"
                        label={t(CONTENT.FORM.CONFIRM_PASSWORD)}
                        variant="outlined"
                        required={true}
                        onChange={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                        value={values.confirmPassword}
                        className="modal-input-field"
                        InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                <CheckIcon />
                              </InputAdornment>
                          ),
                        }}
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                        <Typography color="error" variant="caption"
                                    className="modal-error-message">
                          {errors.confirmPassword.toString()}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        endIcon={<HowToRegIcon />}
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                        className="modal-confirm-button"
                    >
                      <strong>{t(CONTENT.FORM.SIGN_UP)}</strong>
                    </Button>
                  </Form>
              )}
            </Formik>
            <Copyright />
          </Box>
        </Modal>
      </>
  );
});
