import AddCircleOutlineOutlinedIcon
                                                     from "@mui/icons-material/AddCircleOutlineOutlined";
import BadgeOutlinedIcon
                                                     from "@mui/icons-material/BadgeOutlined";
import CheckIcon
                                                     from "@mui/icons-material/Check";
import LoadingButton
                                                     from '@mui/lab/LoadingButton';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  InputAdornment,
  Modal,
  TextField,
  Typography
}                                                    from '@mui/material'
import {Form, Formik}                                from "formik";
import {observer}                                    from "mobx-react-lite";
import React, {useEffect, useState}                  from "react";
import {useTranslation}                              from "react-i18next";
import SimpleBar                                     from "simplebar-react";
import * as Yup                                      from "yup";
import InitialImage
                                                     from '../../Assets/Images/NoImage.png';
import {ACTIONS, CONTENT, CONTENT_TYPE, HTTP_STATUS} from "../../Constants";
import {useStores}                                   from "../../Hooks";
import {
  addItemToCollection,
  formItemRequest,
  getRandomImage,
  getTags,
  toUrlOrDefault,
  updateCollectionItem
}                                                    from "../../Services";
import {
  BooleanInputField,
  DateInputField,
  NumberInputField,
  StringInputField
}                                                    from "../Fields";
import {
  TextInputField
}                                                    from "../Fields/TextInputField";
import {FieldModal}                                  from "./FieldModal";
import "./Styles/Modal.scss";

export const ItemModal = observer((props) => {
  const {t} = useTranslation();
  const {
    item, action,
    buttonClassName, buttonIcon,
    collection, onSuccess
  } = props;
  const [isModalOpen, setModalOpen] = useState(false);
  const [isImageLoading, setImageLoading] = useState(false);
  const [isWaitingServer, setWaitingServer] = useState(false);
  const [additionalFields, setAdditionalFields] = useState([]);
  const {collectionStore, themeStore} = useStores();
  const tags = collectionStore.getTags();
  const initialValues = {
    name: item ? item.name : "",
    image: item ? item.imageLink : InitialImage,
    tags: item ? [...item.tags.map(tag => tag.name)] : [],
  };
  const validationSchema = Yup.object({
    name: Yup.string(t(CONTENT.VALIDATION.COLLECTION_NAME.ENTER))
    .min(3, t(CONTENT.VALIDATION.COLLECTION_NAME.SIZE))
    .required(t(CONTENT.VALIDATION.COLLECTION_NAME.REQUIRED)),
    image: Yup.mixed()
    .test("image", t(CONTENT.VALIDATION.IMAGE.REQUIRED),
        (value) => value !== InitialImage)
  });
  const handleModalOpen = () => {
    setModalOpen(true);
    item && setAdditionalFields(item.fields);
  };
  const handleModalClose = () => {
    setAdditionalFields([]);
    setModalOpen(false);
  };
  const handleAddField = (field) => {
    setAdditionalFields([...additionalFields, field]);
  };
  const handleConfirm = async (values) => {
    setWaitingServer(true);
    values.id = item ? item.id : null;
    const request = await formItemRequest(values);
    const response = action === ACTIONS.CREATE
        ? await addItemToCollection(collection, request)
        : await updateCollectionItem(collection, request);
    setWaitingServer(false);
    response.status === HTTP_STATUS.OK && (await onSuccess()
        || handleModalClose());
  };
  useEffect(() => {
    const fetchData = async () => getTags();
    fetchData().catch(error => console.log(error));
  }, []);
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
          <SimpleBar className="modal-main-box"
                     style={{backgroundColor: themeStore.getBackgroundPaperColor()}}>
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
                  : t(CONTENT.FORM.EDIT))} {t(CONTENT.FORM.ITEM)}
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
                    <Autocomplete
                        className="modal-input-field"
                        multiple
                        options={tags}
                        value={values.tags}
                        freeSolo
                        onChange={(_event, value) => {
                          setFieldValue("tags", value);
                        }}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip variant="outlined"
                                      label={option} color="secondary"
                                      {...getTagProps({index})} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label={t(CONTENT.FORM.TAGS)}
                                placeholder={t(CONTENT.FORM.TAG_HOLDER)}
                            />
                        )}
                    />
                    {errors.tags && touched.tags && (
                        <Typography variant="caption" color="error"
                                    className="modal-error-message">
                          {errors.tags.toString()}
                        </Typography>
                    )}
                    {
                      additionalFields.map((field, index) => {
                        const customField = `customField${index}`;
                        const saveField = (event) => {
                          setFieldValue(customField, {
                            name: field.name,
                            contentType: field.contentType,
                            value: field.contentType === CONTENT_TYPE.BOOLEAN
                                ? event.target.checked
                                : event.target.value,
                          });
                        };
                        switch (field.contentType) {
                          case CONTENT_TYPE.STRING:
                            return (
                                <StringInputField
                                    key={index} label={field.name}
                                    saveField={saveField}
                                    defaultValue={field.value}
                                    className="modal-input-field"
                                />
                            );
                          case CONTENT_TYPE.TEXT:
                            return <TextInputField
                                key={index} label={field.name}
                                defaultValue={field.value}
                                saveField={saveField}
                                className="modal-input-field"
                            />
                          case CONTENT_TYPE.DATE:
                            return <DateInputField
                                key={index} label={field.name}
                                saveField={saveField}
                                className="modal-input-field"
                                onChange={date => {
                                  field.value = date;
                                  setFieldValue(customField, {
                                    name: field.name,
                                    contentType: field.contentType,
                                    value: date,
                                  });
                                }}
                                value={
                                    field.value
                                    || (values[customField]
                                        && values[customField].value)
                                    || null
                                }
                            />;
                          case CONTENT_TYPE.NUMBER:
                            return <NumberInputField
                                key={index} label={field.name}
                                defaultValue={field.value}
                                saveField={saveField}
                                className="modal-input-field"
                            />
                          case CONTENT_TYPE.BOOLEAN:
                            return <BooleanInputField
                                key={index} label={field.name}
                                defaultValue={field.value}
                                saveField={saveField}
                            />;
                          default:
                            return null;
                        }
                      })
                    }
                    <FieldModal
                        buttonClassName="modal-input-field"
                        buttonContent={t(CONTENT.FORM.ADD_FIELD)}
                        action={ACTIONS.ADD}
                        existingFields={[additionalFields.map(
                            (field) => field.name), "name", "tags"]}
                        onAction={handleAddField}
                    />
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
                                     component="label"
                                     loading={isImageLoading}
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
                      <strong>{t(action === ACTIONS.CREATE
                          ? CONTENT.FORM.CREATE
                          : CONTENT.FORM.EDIT)}</strong>
                    </LoadingButton>
                  </Form>
              )}
            </Formik>
          </SimpleBar>
        </Modal>
      </>
  );
});
