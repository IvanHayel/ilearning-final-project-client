import BadgeOutlinedIcon                               from "@mui/icons-material/BadgeOutlined";
import CheckIcon
                                                       from "@mui/icons-material/Check";
import LoadingButton
                                                       from '@mui/lab/LoadingButton';
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
}                                                      from "@mui/material";
import {Form, Formik}                                  from "formik";
import {observer}                                      from "mobx-react-lite";
import React, {useState}                               from "react";
import {useTranslation}                                from "react-i18next";
import * as Yup                                        from "yup";
import {ACTIONS, CONTENT, CONTENT_TYPE, CONTENT_TYPES} from "../../Constants";
import "./Styles/Modal.scss";

export const FieldModal = observer((props) => {
  const {t} = useTranslation();
  const {
    field,
    buttonClassName,
    buttonContent,
    action,
    onAction
  } = props;
  const [isModalOpen, setModalOpen] = useState(false);
  const initialValues = {
    name: field ? field.name : "",
    contentType: field ? field.contentType : CONTENT_TYPE.STRING,
  };
  const validationSchema = Yup.object({
    name: Yup.string(t(CONTENT.VALIDATION.FIELD_NAME.ENTER))
    .min(3, t(CONTENT.VALIDATION.FIELD_NAME.SIZE))
    .required(t(CONTENT.VALIDATION.FIELD_NAME.REQUIRED)),
  });
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleConfirm = async (values) => {
    onAction(values);
    handleModalClose();
  };
  return (
      <>
        <Button
            variant="outlined"
            className={buttonClassName}
            color="inherit"
            onClick={handleModalOpen}
        >
          {buttonContent}
        </Button>
        <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
        >
          <Box className="modal-main-box"
               sx={{backgroundColor: 'background.paper'}}>
            <Typography
                id="modal-modal-title"
                color="primary"
                variant="h6"
                component="h2"
                textAlign="center"
                fontWeight="bold"
            >
              {
                t(action === ACTIONS.ADD
                    ? CONTENT.FORM.ADD_FIELD
                    : CONTENT.FORM.EDIT_FIELD)
              }
            </Typography>
            <Formik
                initialValues={initialValues}
                onSubmit={handleConfirm}
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
                        type="text"
                        name="name"
                        label={t(CONTENT.FORM.NAME)}
                        variant="outlined"
                        required={true}
                        onChange={handleChange("name")}
                        onBlur={handleBlur("name")}
                        value={values.name}
                        className="modal-input-field"
                        InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                <BadgeOutlinedIcon />
                              </InputAdornment>
                          ),
                        }}
                    />
                    {
                        errors.name && touched.name && (
                            <Typography variant="caption" color="error"
                                        className="modal-error-message">
                              {errors.name.toString()}
                            </Typography>
                        )
                    }
                    <FormControl className="modal-input-field">
                      <InputLabel id="content-type">
                        {t(CONTENT.FORM.CONTENT_TYPE)}
                      </InputLabel>
                      <Select
                          labelId="content-type"
                          label={t(CONTENT.FORM.CONTENT_TYPE)}
                          required={true}
                          value={values.contentType}
                          onBlur={handleBlur("contentType")}
                          onChange={handleChange("contentType")}
                          renderValue={(selected) =>
                              <Chip label={t(CONTENT.TYPE[selected])} />}
                      >
                        {
                          CONTENT_TYPES.map(([key, value]) => (
                              <MenuItem key={key} value={key}>
                                {t(value)}
                              </MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                    {
                        errors.contentType && touched.contentType && (
                            <Typography variant="caption"
                                        className="modal-error-message">
                              {errors.contentType.toString()}
                            </Typography>
                        )
                    }
                    <LoadingButton
                        type="submit"
                        color="secondary"
                        variant="contained"
                        endIcon={<CheckIcon />}
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                        className="modal-confirm-button"
                    >
                      <strong>{
                        t(action === ACTIONS.ADD
                            ? CONTENT.FORM.ADD
                            : CONTENT.FORM.EDIT)
                      }</strong>
                    </LoadingButton>
                  </Form>
              )}
            </Formik>
          </Box>
        </Modal>
      </>
  );
});
