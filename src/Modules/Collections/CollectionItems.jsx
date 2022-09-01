import AddCircleOutlineOutlinedIcon
                                      from "@mui/icons-material/AddCircleOutlineOutlined";
import {
  Box,
  Button,
  Container,
  Grid,
  Pagination,
  Typography
}                                     from "@mui/material";
import {
  observer
}                                     from "mobx-react-lite";
import {useEffect, useMemo, useState} from "react";
import {
  useTranslation
}                                     from "react-i18next";
import {
  createSearchParams,
  useNavigate,
  useParams
}                                     from "react-router-dom";
import {
  ItemModal,
  ItemPreview,
  SortConfigurationDialog
}                                     from "../../Components";
import {
  ACTIONS,
  CONTENT,
  ITEMS_PER_PAGE,
  ITEMS_PER_PAGE_OWNER,
  ROUTE_PARAMETER,
  ROUTE_URL,
  SEARCH_SCOPE,
  SORT_DIRECTION,
  SORT_STRATEGY
}                                     from "../../Constants";
import {
  useStore
}                                     from "../../Hooks";
import {
  getCollection,
  getCollectionItems,
  isEnoughRights
}                                     from "../../Services";
import {
  scrollToTop
}                                     from "../../Utils";
import "./Styles/Collections.scss";

export const CollectionItems = observer(() => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const [page, setPage] = useState(1);
  const [sortDirection, setSortDirection] = useState(SORT_DIRECTION.DEFAULT);
  const [sortStrategy, setSortStrategy] = useState(SORT_STRATEGY.DEFAULT);
  const collectionStore = useStore("collectionStore");
  const collection = collectionStore.getCollection();
  const items = collectionStore.getItems();
  const perPage = useMemo(() => {
    return isEnoughRights(collection.owner.id, collection.owner.username)
        ? ITEMS_PER_PAGE_OWNER : ITEMS_PER_PAGE;
  }, [collection]);
  const start = (page - 1) * perPage;
  const end = page * perPage;
  const handleSortConfigurationClose = (isChanged, direction, strategy) => {
    if (isChanged) {
      setSortDirection(direction);
      setSortStrategy(strategy);
    }
  };
  const handleShowMore = () => {
    const searchParams = createSearchParams({
      [ROUTE_PARAMETER.SEARCH.TERM]: collection.theme.name,
      [ROUTE_PARAMETER.SEARCH.SCOPE]: SEARCH_SCOPE.COLLECTIONS_BY_THEME,
    });
    navigate(`${ROUTE_URL.SEARCH}?${searchParams}`);
  };
  const handleChangePage = (_event, value) => {
    setPage(value);
    scrollToTop();
  };
  const handleCreateSuccess = async () => {
    setPage(1);
    await getCollectionItems(collection.name);
  };
  const handleItemDelete = async () => {
    setPage(1);
    await getCollectionItems(collection.name);
  };
  const handleItemLike = async () => {
    await getCollectionItems(collection.name);
  };
  useEffect(() => {
    const fetchData = async () => {
      await getCollection(params.name);
      await getCollectionItems(params.name, sortDirection, sortStrategy);
    };
    fetchData().catch(() => navigate(ROUTE_URL.WHOOPS.NOT_FOUND));
  }, [navigate, params.name, sortDirection, sortStrategy]);
  return (
      <Container className="collections-container">
        <Typography color="primary" variant="h4" className="collections-title">
          <strong>
            {t(CONTENT.COLLECTION_ITEMS.TITLE)}<br />
            {collection.name}
          </strong>
        </Typography>
        <Box className="collections-additional-actions">
          <SortConfigurationDialog
              currentDirection={sortDirection}
              currentStrategy={sortStrategy}
              onDialogClose={handleSortConfigurationClose}
          />
          <Button variant="outlined" color="warning" onClick={handleShowMore}
                  sx={{backgroundColor: "background.paper", fontWeight: "bold"}}
          >
            {t(CONTENT.COLLECTION_ITEMS.MORE_BUTTON)}
          </Button>
        </Box>
        <Grid container spacing={2} padding={1} marginY={1}>
          {
              isEnoughRights(collection.owner.id, collection.owner.username) &&
              <Grid item xs={10} md={3}>
                <ItemModal
                    action={ACTIONS.CREATE}
                    buttonClassName="create-collection-button"
                    collection={collection.name}
                    onSuccess={handleCreateSuccess}
                    buttonIcon={<AddCircleOutlineOutlinedIcon
                        fontSize="large" />}
                />
              </Grid>
          }
          {
            [...items].slice(start, end)
            .map((item, index) => (
                <ItemPreview key={index} collection={collection}
                             item={item}
                             onDelete={handleItemDelete}
                             onLike={handleItemLike}
                />
            ))
          }
        </Grid>
        {
            items.length > 0 &&
            <Pagination color={"primary"} className="pagination-bar"
                        variant="outlined" shape="rounded"
                        page={page}
                        onChange={handleChangePage}
                        count={Math.ceil(items.length / perPage)} />
        }
      </Container>
  );
});
