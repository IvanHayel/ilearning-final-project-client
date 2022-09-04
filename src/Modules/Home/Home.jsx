import {Box, Divider, Grid, Skeleton, Stack, Typography} from "@mui/material";
import {observer}                                        from "mobx-react";
import React, {useEffect}                                from "react";
import {useTranslation}                                  from "react-i18next";
import {
  createSearchParams,
  useNavigate
}                                                        from "react-router-dom";
import ReactWordcloud                                    from 'react-wordcloud';
import {
  CollectionPreview
}                                                        from "../../Components";
import {
  CONTENT,
  ROUTE_PARAMETER,
  ROUTE_URL,
  SEARCH_SCOPE
}                                                        from "../../Constants";
import {useStores}                                       from "../../Hooks";
import {
  getTagsForCloud,
  getTopCollections
}                                                        from "../../Services";
import "./Styles/Home.scss";

export const Home = observer(() => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {authenticationStore, collectionStore} = useStores();
  const tagsForCloud = collectionStore.getTagsForCloud();
  const topCollections = collectionStore.getTopCollections();
  const isCurrentUserAuthenticated = authenticationStore.isAuthenticated();
  const currentUser = authenticationStore.getCurrentUser();
  const handleTagClick = (tag) => {
    const searchParams = createSearchParams({
      [ROUTE_PARAMETER.SEARCH.TERM]: tag.text,
      [ROUTE_PARAMETER.SEARCH.SCOPE]: SEARCH_SCOPE.ITEMS_BY_TAG,
    });
    navigate(`${ROUTE_URL.SEARCH}?${searchParams}`);
  };
  const handleDataChange = async () => {
    await getTagsForCloud();
    await getTopCollections(3);
  };
  useEffect(() => {
    const fetchData = async () => {
      await getTagsForCloud();
      await getTopCollections(3);
    };
    fetchData().catch(error => console.error(error));
  }, []);
  return (
      <Stack className="home" alignItems="center">
        {isCurrentUserAuthenticated ? (
            <Typography color="primary" variant="h3" className="home-greeting">
              👋 {t(CONTENT.HOME.TITLE)}, {currentUser.username}!
            </Typography>
        ) : (
            <Box>
              <Typography color="primary" variant="h3"
                          className="home-greeting">
                👋 {t(CONTENT.HOME.TITLE)}!
              </Typography>
              <Divider />
              <Typography color="secondary" variant="h5"
                          className="home-description">
                <i>
                  <strong>{t(CONTENT.HOME.DESCRIPTION)}</strong>
                </i>
              </Typography>
              <Divider />
            </Box>
        )}
        <Grid className="top-collections" container
              spacing={2} padding={1} marginY={1} wrap="wrap">
          <Grid item xs={9}>
            <Typography color="secondary" variant="h5"
                        className="home-description">
              🔥 {t(CONTENT.HOME.TOP)} 🔥
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography color="primary.light" variant="h5"
                        className="home-description">
              ☁️ {t(CONTENT.HOME.TAG_CLOUD)}
            </Typography>
          </Grid>
          {
            [...topCollections].map((collection) => (
                <CollectionPreview collection={collection}
                                   onDelete={handleDataChange}
                                   onEdit={handleDataChange}
                                   key={collection.id} />
            ))
          }
          {
              [...topCollections].length < 3 &&
              <>
                {
                    [...topCollections].length < 1 &&
                    <Grid item xs={3}>
                      <Skeleton variant="rectangular" height={400} />
                    </Grid>
                }
                {
                    [...topCollections].length < 2 &&
                    <Grid item xs={3}>
                      <Skeleton variant="rectangular" height={400} />
                    </Grid>
                }
                <Grid item xs={3}>
                  <Skeleton variant="rectangular" height={400} />
                </Grid>
              </>
          }
          {
              tagsForCloud.length > 0 &&
              <Grid item xs={3} className="cloud">
                <ReactWordcloud
                    words={tagsForCloud}
                    size={[300, 400]}
                    callbacks={{
                      onWordClick: handleTagClick
                    }}
                    options={{
                      enableTooltip: false,
                      fontSizes: [14, 70],
                      fontWeight: "bold"
                    }}
                />
              </Grid>
          }
          {
              tagsForCloud.length < 1 &&
              <Grid item xs={3}>
                <Skeleton variant="rectangular" animation="wave" height={400} />
              </Grid>
          }
        </Grid>
      </Stack>
  );
});
