import {Box, Container, Grid, Pagination, Typography} from "@mui/material";
import {
  observer
}                                                     from "mobx-react-lite";
import {
  useEffect,
  useState
}                                                     from "react";
import {
  useTranslation
}                                                     from "react-i18next";
import {
  CollectionPreview,
  SortConfigurationDialog
}                                                     from "../../Components";
import {
  COLLECTIONS_PER_PAGE,
  CONTENT,
  SORT_DIRECTION,
  SORT_STRATEGY
}                                                     from "../../Constants";
import {
  useStore
}                                                     from "../../Hooks";
import {
  getCollections
}                                                     from "../../Services";
import {
  scrollToTop
}                                                     from "../../Utils";
import "./Styles/Collections.scss";

export const GlobalCollections = observer(() => {
  const {t} = useTranslation();
  const [sortDirection, setSortDirection] = useState(SORT_DIRECTION.DEFAULT);
  const [sortStrategy, setSortStrategy] = useState(SORT_STRATEGY.DEFAULT);
  const [page, setPage] = useState(1);
  const collectionStore = useStore("collectionStore");
  const collections = collectionStore.getCollections();
  const start = (page - 1) * COLLECTIONS_PER_PAGE;
  const end = page * COLLECTIONS_PER_PAGE;
  const handleSortConfigurationClose = (isChanged, direction, strategy) => {
    if (isChanged) {
      setSortDirection(direction);
      setSortStrategy(strategy);
    }
  };
  const handleChangePage = (_event, value) => {
    setPage(value);
    scrollToTop();
  };
  useEffect(() => {
    const fetchData = async () => {
      await getCollections(sortDirection, sortStrategy);
    };
    fetchData().catch(error => console.error(error));
  }, [sortDirection, sortStrategy]);
  return (
      <Container className="collections-container">
        <Typography color="primary" variant="h4" className="collections-title">
          <strong>{t(CONTENT.COLLECTIONS.TITLE)}</strong>
        </Typography>
        <Box className="collections-additional-actions">
          <SortConfigurationDialog
              currentDirection={sortDirection}
              currentStrategy={sortStrategy}
              onDialogClose={handleSortConfigurationClose}
          />
        </Box>
        <Grid container spacing={2} padding={1} marginY={1}>
          {
            [...collections].slice(start, end)
            .map((collection) => (
                <CollectionPreview key={collection.id}
                                   collection={collection} />
            ))
          }
        </Grid>
        {
            collections.length > 0 &&
            <Pagination color={"primary"} className="pagination-bar"
                        variant="outlined" shape="rounded"
                        hidden={collections.length < 1}
                        page={page}
                        onChange={handleChangePage}
                        count={Math.ceil(
                            collections.length / COLLECTIONS_PER_PAGE)} />
        }
      </Container>
  );
});