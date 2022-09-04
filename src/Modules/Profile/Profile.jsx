import FormatPaintIcon                                  from '@mui/icons-material/FormatPaint';
import {Container, Grid, IconButton, Stack, Typography} from "@mui/material";
import {observer}                                       from "mobx-react-lite";
import React, {useEffect, useState}                     from "react";
import {useTranslation}                                 from "react-i18next";
import {CONTENT}                                        from "../../Constants";
import {useStores}                                      from "../../Hooks";
import {getStatistics}                                  from "../../Services";
import {randomColor}                                    from "../../Utils";
import "./Styles/Profile.scss";

export const Profile = observer(() => {
  const {t} = useTranslation();
  const [isRandomColorEnabled, setRandomColorEnabled] = useState(true);
  const {authenticationStore, collectionStore} = useStores();
  const currentUser = authenticationStore.getCurrentUser();
  const statistics = collectionStore.getStatistics();
  const handleColorButtonClick = () => {
    setRandomColorEnabled(!isRandomColorEnabled);
  };
  useEffect(() => {
    const fetchStatistics = async () => {
      await getStatistics();
    };
    fetchStatistics().catch(error => console.error(error));
  }, []);
  return (
      <Container className="profile-container">
        <Grid container>
          <Grid item xs={12}>
            <Typography color="primary" variant="h3"
                        className="profile-title">
              {t(CONTENT.PROFILE.TITLE)}
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="end">
            <IconButton size="medium" className="color-button"
                        onClick={handleColorButtonClick}>
              <FormatPaintIcon className="color-icon" fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Typography color="secondary" variant="h4"
                        className="profile-subtitle">
              {t(CONTENT.PROFILE.PERSONAL.TITLE)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack flexDirection="row" gap={3}>
              <Typography variant="h6" className="profile-text">
                {t(CONTENT.PROFILE.PERSONAL.USERNAME)}
              </Typography>
              <Typography color={isRandomColorEnabled && randomColor()}
                          variant="h6" className="profile-text">
                {currentUser.username}
              </Typography>
            </Stack>
            <Stack flexDirection="row" gap={3}>
              <Typography variant="h6" className="profile-text">
                {t(CONTENT.PROFILE.PERSONAL.EMAIL)}
              </Typography>
              <Typography color={isRandomColorEnabled && randomColor()}
                          variant="h6" className="profile-text">
                {currentUser.email}
              </Typography>
            </Stack>
            <Stack flexDirection="row" gap={3}>
              <Typography variant="h6" className="profile-text">
                {t(CONTENT.PROFILE.PERSONAL.ROLES)}
              </Typography>
              <Typography color={isRandomColorEnabled && randomColor()}
                          variant="h6" className="profile-text">
                {currentUser.roles.map((role) => role.substring(5)).join(", ")}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Typography color="secondary" variant="h4"
                        className="profile-subtitle">
              {t(CONTENT.PROFILE.STATISTICS.TITLE)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack flexDirection="row" gap={3}>
              <Typography variant="h6" className="profile-text">
                {t(CONTENT.PROFILE.STATISTICS.COLLECTIONS)}
              </Typography>
              <Typography color={isRandomColorEnabled && randomColor()}
                          variant="h6" className="profile-text">
                {statistics.collectionsCount}
              </Typography>
            </Stack>
            <Stack flexDirection="row" gap={3}>
              <Typography variant="h6" className="profile-text">
                {t(CONTENT.PROFILE.STATISTICS.LIKES)}
              </Typography>
              <Typography color={isRandomColorEnabled && randomColor()}
                          variant="h6" className="profile-text">
                {statistics.likesCount}
              </Typography>
            </Stack>
            <Stack flexDirection="row" gap={3}>
              <Typography variant="h6" className="profile-text">
                {t(CONTENT.PROFILE.STATISTICS.COMMENTS)}
              </Typography>
              <Typography color={isRandomColorEnabled && randomColor()}
                          variant="h6" className="profile-text">
                {statistics.commentsCount}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
  );
});
