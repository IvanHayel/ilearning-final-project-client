import ExpandMoreIcon                               from '@mui/icons-material/ExpandMore';
import FavoriteIcon
                                                    from "@mui/icons-material/Favorite";
import FavoriteBorderIcon
                                                    from "@mui/icons-material/FavoriteBorder";
import SendIcon
                                                    from '@mui/icons-material/Send';
import SettingsIcon
                                                    from '@mui/icons-material/Settings';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Box,
  Chip,
  Container,
  Grid,
  IconButton,
  Switch,
  TextField,
  Typography
}                                                   from "@mui/material";
import {Form, Formik}                               from "formik";
import {observer}                                   from "mobx-react";
import {useEffect, useMemo, useState}               from "react";
import {MessageList}                                from "react-chat-elements";
import {useTranslation}                             from "react-i18next";
import {createSearchParams, useNavigate, useParams} from "react-router-dom";
import SimpleBar                                    from 'simplebar-react';
import {ItemModal}                                  from "../../Components";
import {
  ACTIONS,
  CONTENT,
  CONTENT_TYPE,
  HTTP_STATUS,
  ROUTE_PARAMETER,
  ROUTE_URL,
  SEARCH_SCOPE
}                                                   from "../../Constants";
import {useStores}                                  from "../../Hooks";
import {
  getCollection,
  getCollectionItem,
  isAuthenticated,
  isEnoughRights,
  likeItem
}                                                   from "../../Services";
import {
  isSocketConnected,
  leaveComment,
  socketSubscribeItem,
  socketUnsubscribeItem
}                                                   from "../../Services/CommentService";
import "./Styles/Item.scss"

export const Item = observer(() => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const [expanded, setExpanded] = useState(false);
  const {
    authenticationStore,
    collectionStore,
    commentStore,
    themeStore
  } = useStores();
  const item = collectionStore.getItem();
  const collection = collectionStore.getCollection();
  const itemId = useMemo(() => item.id, [item]);
  const currentUserName = authenticationStore.getCurrentUserName();
  const isLiked = useMemo(() =>
          item.likes.some(like => like.author.username === currentUserName),
      [item, currentUserName]);
  const comments = commentStore.getComments(itemId, currentUserName,
      themeStore.getTimeAgo());
  const handleAccordion = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleTagClick = (event) => {
    const searchParams = createSearchParams({
      [ROUTE_PARAMETER.SEARCH.TERM]: event.target.innerText,
      [ROUTE_PARAMETER.SEARCH.SCOPE]: SEARCH_SCOPE.ITEMS_BY_TAG,
    });
    navigate(`${ROUTE_URL.SEARCH}?${searchParams}`);
  };
  const handleLike = async () => {
    const response = await likeItem(collection.name, item);
    response.status === HTTP_STATUS.OK &&
    await getCollectionItem(params.name, params.item);
  };
  const handleEditSuccess = async () => {
    await getCollectionItem(params.name, params.item);
  };
  const handleLeaveComment = (values, {resetForm}) => {
    if (isAuthenticated()) {
      leaveComment(item.id, values)
      resetForm({values: ''});
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await getCollection(params.name);
      await getCollectionItem(params.name, params.item);
    };
    fetchData().catch(() => navigate(ROUTE_URL.WHOOPS.NOT_FOUND));
  }, [navigate, params.name, params.item]);
  useEffect(() => {
    let unsubscribe = null;
    if (isSocketConnected()) {
      unsubscribe = socketSubscribeItem(itemId);
    }
    return () => {
      unsubscribe && socketUnsubscribeItem(itemId);
    };
  }, [itemId]);
  return (
      <Container className="item-container">
        <Grid container>
          <Grid item xs={12} className="title-box">
            <Typography color="primary" variant="h4" className="item-title">
              <strong>
                {item.name}
              </strong>
            </Typography>
          </Grid>
          <Grid item xs={3} className="action-box">
            <img src={item.imageLink} className="item-image" alt="NOT_FOUND" />
            <SimpleBar className="preview-tags">
              {
                item.tags.map((tag, index) => (
                    <Chip key={index} className="tag" color="secondary"
                          onClick={handleTagClick} label={tag.name} />
                ))
              }
            </SimpleBar>
            <Box className="action-buttons">
              <IconButton color="info" onClick={handleLike}
                          disabled={!isAuthenticated()}>
                <Badge badgeContent={item.likes.length} color="primary">
                  {
                      (isLiked && <FavoriteIcon fontSize="large" />)
                      || <FavoriteBorderIcon fontSize="large" />
                  }
                </Badge>
              </IconButton>
              {
                  isEnoughRights(collection.owner.id, collection.owner.username)
                  && <ItemModal
                      action={ACTIONS.EDIT}
                      item={item}
                      collection={collection.name}
                      onSuccess={handleEditSuccess}
                      buttonIcon={<SettingsIcon fontSize="large" />}
                  />
              }
            </Box>
          </Grid>
          <Grid item xs={9} className={"info-box"}>
            <Accordion expanded={expanded === 'main'}
                       onChange={handleAccordion('main')}>
              <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="main-content"
                  id="main-header"
              >
                <Typography color="secondary.light" className="accordion-title">
                  {t(CONTENT.ITEM.GENERAL.TITLE)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="accordion-plain">
                  <strong>{t(CONTENT.ITEM.GENERAL.COLLECTION)}</strong>
                  {collection.name}<br />
                </Typography>
                <Typography className="accordion-plain">
                  <strong>{t(CONTENT.ITEM.GENERAL.THEME)}</strong>
                  {collection.theme.name}<br />
                </Typography>
                <Typography className="accordion-plain">
                  <strong>{t(CONTENT.ITEM.GENERAL.OWNER)}</strong>
                  {collection.owner.username}<br />
                </Typography>
                <Typography className="accordion-plain">
                  <strong>{t(CONTENT.ITEM.GENERAL.ITEM)}</strong>
                  {item.name}<br />
                </Typography>
                <Typography className="accordion-plain">
                  <strong>{t(CONTENT.ITEM.GENERAL.CREATED)}</strong>
                  {new Date(item.createDate).toLocaleString()}<br />
                </Typography>
                <Typography className="accordion-plain">
                  <strong>{t(CONTENT.ITEM.GENERAL.UPDATED)}</strong>
                  {new Date(item.updateDate).toLocaleString()}<br />
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'additional'}
                       onChange={handleAccordion('additional')}>
              <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="additional-content"
                  id="additional-header"
              >
                <Typography color="secondary.light" className="accordion-title">
                  {t(CONTENT.ITEM.ADDITIONAL.TITLE)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {
                  item.fields.map((field, index) => {
                    switch (field.contentType) {
                      case CONTENT_TYPE.STRING:
                      case CONTENT_TYPE.NUMBER:
                        return (
                            <Typography key={index} className="accordion-plain">
                              <strong>{field.name}: </strong> {field.value}
                            </Typography>
                        );
                      case CONTENT_TYPE.TEXT:
                        return (
                            <Box key={index}>
                              <Typography className="accordion-plain">
                                <strong>{field.name}:</strong><br />
                              </Typography>
                              <Typography
                                  className="accordion-plain break-line">
                                {field.value}
                              </Typography>
                            </Box>
                        );
                      case CONTENT_TYPE.DATE:
                        return (
                            <Typography key={index} className="accordion-plain">
                              <strong>{field.name}: </strong>
                              {new Date(field.value).toLocaleString()}
                            </Typography>
                        );
                      case CONTENT_TYPE.BOOLEAN:
                        return (
                            <Typography key={index} className="accordion-plain">
                              <strong>{field.name}: </strong>
                              <Switch color="success" disabled
                                      checked={field.value === "true"} />
                            </Typography>
                        );
                      default:
                        return "";
                    }
                  })
                }
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Box className="comment-box"
                 sx={{backgroundColor: "background.paper"}}>
              <Formik
                  initialValues={{content: ""}}
                  onSubmit={handleLeaveComment}
              >
                {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                    <Form className="comment-input">
                      <TextField
                          disabled={!isAuthenticated()}
                          type="text"
                          name="message"
                          label={
                            isAuthenticated() ?
                                t(CONTENT.ITEM.COMMENT_PLACEHOLDER) :
                                t(CONTENT.ITEM.COMMENT_PLACEHOLDER_UNAUTHORIZED)
                          }
                          variant="outlined"
                          fullWidth
                          onChange={handleChange("content")}
                          onBlur={handleBlur("content")}
                          value={values.content}
                          InputProps={{
                            endAdornment: (
                                <IconButton
                                    type="submit"
                                    size={"large"}
                                    disabled={!isAuthenticated()}
                                    onClick={handleSubmit}
                                >
                                  <SendIcon fontSize="inherit" />
                                </IconButton>
                            )
                          }}
                      />
                    </Form>
                )}
              </Formik>
              <SimpleBar className='message-list'>
                <MessageList
                    lockable={true}
                    dataSource={comments}
                />
              </SimpleBar>
            </Box>
          </Grid>
        </Grid>
      </Container>
  );
});
