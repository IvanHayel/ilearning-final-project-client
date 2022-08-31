import AddCircleOutlineOutlinedIcon
                                       from "@mui/icons-material/AddCircleOutlineOutlined";
import BadgeOutlinedIcon               from "@mui/icons-material/BadgeOutlined";
import CheckIcon                       from "@mui/icons-material/Check";
import SubjectIcon                     from '@mui/icons-material/Subject';
import LoadingButton                   from '@mui/lab/LoadingButton';
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Modal,
  TextField,
  Typography,
}                                      from "@mui/material";
import {Form, Formik}                  from "formik";
import {observer}                      from "mobx-react";
import React, {useState}               from "react";
import {useTranslation}                from "react-i18next";
import * as Yup                        from "yup";
import InitialImage                    from '../../Assets/Images/NoImage.png';
import {ACTIONS, CONTENT, HTTP_STATUS} from "../../Constants";
import {
  createCollection,
  editCollection,
  formCollectionRequest,
  getRandomImage,
  toUrlOrDefault
}                                      from "../../Services";
import "./Styles/Modal.scss";

export const CollectionModal = observer((props) => {
  const {t} = useTranslation();
  const {collection, action, buttonClassName, buttonIcon, onSuccess} = props;
  const [isModalOpen, setModalOpen] = useState(false);
  const [isImageLoading, setImageLoading] = useState(false);
  const [isWaitingServer, setWaitingServer] = useState(false);
  const initialValues = {
    name: collection ? collection.name : "",
    theme: collection ? collection.theme.name : "",
    image: collection ? collection.imageLink : InitialImage,
  };
  const validationSchema = Yup.object({
    name: Yup.string(t(CONTENT.VALIDATION.COLLECTION_NAME.ENTER))
    .min(3, t(CONTENT.VALIDATION.COLLECTION_NAME.SIZE))
    .required(t(CONTENT.VALIDATION.COLLECTION_NAME.REQUIRED)),
    theme: Yup.string(t(CONTENT.VALIDATION.COLLECTION_THEME.ENTER))
    .min(3, t(CONTENT.VALIDATION.COLLECTION_THEME.SIZE))
    .required(t(CONTENT.VALIDATION.COLLECTION_THEME.REQUIRED)),
    image: Yup.mixed()
    .test("image", t(CONTENT.VALIDATION.IMAGE.REQUIRED),
        (value) => value !== InitialImage)
  });
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleConfirm = async (values) => {
    values.id = collection ? collection.id : null;
    setWaitingServer(true);
    const request = await formCollectionRequest(values);
    const response = action === ACTIONS.CREATE
        ? await createCollection(request)
        : await editCollection(request);
    setWaitingServer(false);
    response.status === HTTP_STATUS.OK &&
    (handleModalClose() || (onSuccess && onSuccess()));
  };
  return (
      <>
        <Button
            variant={action === ACTIONS.EDIT ? "contained" : "outlined"}
            className={buttonClassName}
            onClick={handleModalOpen}
            color="secondary"
        >
          {buttonIcon}
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
              {t(action === ACTIONS.CREATE
                  ? t(CONTENT.FORM.CREATE)
                  : t(CONTENT.FORM.EDIT))} {t(CONTENT.FORM.COLLECTION)}
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
                setFieldValue,
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
                    {errors.name && touched.name && (
                        <Typography variant="caption" color="error"
                                    className="modal-error-message">
                          {errors.name.toString()}
                        </Typography>
                    )}
                    <TextField
                        type="text"
                        name="theme"
                        label={t(CONTENT.FORM.THEME)}
                        variant="outlined"
                        required={true}
                        onChange={handleChange("theme")}
                        onBlur={handleBlur("theme")}
                        value={values.theme}
                        className="modal-input-field"
                        InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                <SubjectIcon />
                              </InputAdornment>
                          ),
                        }}
                    />
                    {errors.theme && touched.theme && (
                        <Typography variant="caption" color="error"
                                    className="modal-error-message">
                          {errors.theme.toString()}
                        </Typography>
                    )}
                    {
                      isImageLoading
                          ? <CircularProgress
                              className="modal-loading-spinner" />
                          : <img className="image-preview" alt="Not found"
                                 src={values.image} />
                    }
                    {errors.image && touched.image && (
                        <Typography variant="caption" color="error"
                                    className="modal-error-message">
                          {errors.image.toString()}
                        </Typography>
                    )}
                    <Box className="modal-action-group">
                      <LoadingButton color="inherit" variant="outlined"
                                     component="label" loading={isImageLoading}
                                     onClick={async () => {
                                       setImageLoading(true);
                                       const randomImageUrl = await getRandomImage();
                                       setFieldValue("image", randomImageUrl);
                                       setImageLoading(false);
                                     }}
                      >
                        <strong>{t(CONTENT.FORM.RANDOM_IMAGE)}</strong>
                      </LoadingButton>
                      <Button color="inherit" variant="outlined"
                              component="label">
                        <strong>{t(CONTENT.FORM.YOUR_IMAGE)}</strong>
                        <input hidden accept="image/*" type="file"
                               name="image"
                               onChange={event => {
                                 setFieldValue("image",
                                     toUrlOrDefault(event.target.files[0]));
                               }}
                        />
                      </Button>
                    </Box>
                    <LoadingButton
                        type="submit"
                        color="secondary"
                        variant="contained"
                        loading={isWaitingServer}
                        endIcon={action === ACTIONS.CREATE
                            ? <AddCircleOutlineOutlinedIcon />
                            : <CheckIcon />}
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                        className="modal-confirm-button"
                    >
                      <strong>{action === ACTIONS.CREATE
                          ? t(CONTENT.FORM.CREATE)
                          : t(CONTENT.FORM.EDIT)}</strong>
                    </LoadingButton>
                  </Form>
              )}
            </Formik>
          </Box>
        </Modal>
      </>
  );
});
