import SentimentVeryDissatisfiedIcon
                                          from '@mui/icons-material/SentimentVeryDissatisfied';
import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Pagination,
  Radio,
  RadioGroup,
  Stack,
  Typography
}                                         from "@mui/material";
import {
  observer
}                                         from "mobx-react-lite";
import {useCallback, useEffect, useState} from "react";
import {useTranslation}                   from "react-i18next";
import {
  createSearchParams,
  useNavigate,
  useSearchParams
}                                         from "react-router-dom";
import {
  CollectionPreview,
  ItemPreview
}                                         from "../../Components";
import {
  CONTENT,
  ROUTE_PARAMETER,
  ROUTE_URL,
  SEARCH_ELEMENTS_PER_PAGE,
  SEARCH_SCOPE
}                                         from "../../Constants";
import {useStore}                         from "../../Hooks";
import {
  searchCollections,
  searchCollectionsByTheme,
  searchGlobal,
  searchItems,
  searchItemsByTag,
}                                         from "../../Services";
import "./Styles/Search.scss";

export const Search = observer(() => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [itemsPage, setItemsPage] = useState(1);
  const [collectionsPage, setCollectionsPage] = useState(1);
  const collectionStore = useStore("collectionStore");
  const searchTerm = searchParams.get(ROUTE_PARAMETER.SEARCH.TERM);
  const searchScope = searchParams.get(ROUTE_PARAMETER.SEARCH.SCOPE)
      || SEARCH_SCOPE.GLOBAL;
  const collections = collectionStore.getSearchCollections();
  const items = collectionStore.getSearchItems();
  const itemsStart = (itemsPage - 1) * SEARCH_ELEMENTS_PER_PAGE;
  const itemsEnd = itemsPage * SEARCH_ELEMENTS_PER_PAGE;
  const collectionsStart = (collectionsPage - 1) * SEARCH_ELEMENTS_PER_PAGE;
  const collectionsEnd = collectionsPage * SEARCH_ELEMENTS_PER_PAGE;
  const handleChangeScope = (event) => {
    const parameters = createSearchParams({
      [ROUTE_PARAMETER.SEARCH.TERM]: searchTerm,
      [ROUTE_PARAMETER.SEARCH.SCOPE]: event.target.value,
    });
    setSearchParams(parameters);
  };
  const handleChangeItemsPage = (_event, value) => {
    setItemsPage(value);
  };
  const handleChangeCollectionsPage = (_event, value) => {
    setCollectionsPage(value);
  };
  const startSearch = useCallback(async () => {
    switch (searchScope) {
      case SEARCH_SCOPE.COLLECTIONS:
        await searchCollections(searchTerm);
        break;
      case SEARCH_SCOPE.ITEMS:
        await searchItems(searchTerm);
        break;
      case SEARCH_SCOPE.COLLECTIONS_BY_THEME:
        await searchCollectionsByTheme(searchTerm);
        break;
      case SEARCH_SCOPE.ITEMS_BY_TAG:
        await searchItemsByTag(searchTerm);
        break;
      default:
        await searchGlobal(searchTerm);
    }
  }, [searchTerm, searchScope]);
  useEffect(() => {
    searchTerm || navigate(ROUTE_URL.HOME);
    startSearch().catch(error => console.error(error));
  }, [searchTerm, startSearch, navigate]);
  return (
      <Container className="search-container">
        <Typography color="primary" variant="h4" className="search-title">
          <strong>
            🔍 {t(CONTENT.SEARCH.RESULTS)}<br />
            "{searchTerm}"
          </strong>
        </Typography>
        <FormControl className="scope-selector">
          <FormLabel id="search-scope">
            <Typography color="secondary" fontWeight="bold">
              {t(CONTENT.SEARCH.WHERE_LOOK)}
            </Typography>
          </FormLabel>
          <RadioGroup row aria-labelledby="search-scope"
                      value={searchScope}
                      onChange={handleChangeScope}
          >
            <FormControlLabel value={SEARCH_SCOPE.GLOBAL}
                              label={t(CONTENT.SEARCH.SCOPE.GLOBAL)}
                              control={<Radio color="secondary" />} />
            <FormControlLabel value={SEARCH_SCOPE.COLLECTIONS}
                              label={t(CONTENT.SEARCH.SCOPE.COLLECTIONS)}
                              control={<Radio color="secondary" />} />
            <FormControlLabel value={SEARCH_SCOPE.ITEMS}
                              label={t(CONTENT.SEARCH.SCOPE.ITEMS)}
                              control={<Radio color="secondary" />} />
            <FormControlLabel value={SEARCH_SCOPE.COLLECTIONS_BY_THEME}
                              label={t(CONTENT.SEARCH.SCOPE.THEMES)}
                              control={<Radio color="secondary" />} />
            <FormControlLabel value={SEARCH_SCOPE.ITEMS_BY_TAG}
                              label={t(CONTENT.SEARCH.SCOPE.TAGS)}
                              control={<Radio color="secondary" />} />
          </RadioGroup>
        </FormControl>
        {
            collections.length > 0 &&
            <Box className="found-box">
              <Typography variant="h4" color="primary" className="found-title">
                {t(CONTENT.SEARCH.FOUND.COLLECTIONS)}
              </Typography>
              <Grid container spacing={2} padding={1} marginY={1}>
                {
                    collections.length !== 0 && collections
                    .slice(collectionsStart, collectionsEnd).map(collection =>
                        <CollectionPreview key={collection.id}
                                           collection={collection}
                                           onDelete={startSearch}
                                           onEdit={startSearch}
                        />
                    )
                }
              </Grid>
              <Pagination color={"primary"} className="pagination-bar"
                          variant="outlined" shape="rounded"
                          page={collectionsPage}
                          onChange={handleChangeCollectionsPage}
                          count={Math.ceil(
                              collections.length / SEARCH_ELEMENTS_PER_PAGE)} />
            </Box>
        }
        {
            items.length > 0 &&
            <Box className="found-box">
              <Typography variant="h4" color="primary" className="found-title">
                {t(CONTENT.SEARCH.FOUND.ITEMS)}
              </Typography>
              <Grid container spacing={2} padding={1} marginY={1}>
                {
                    items.length !== 0 && items
                    .slice(itemsStart, itemsEnd).map((item) => (
                        <ItemPreview key={~item.id} collection={item.collection}
                                     item={item}
                                     onDelete={startSearch}
                                     onLike={startSearch}
                        />
                    ))
                }
              </Grid>
              <Pagination color={"primary"} className="pagination-bar"
                          variant="outlined" shape="rounded"
                          page={itemsPage}
                          onChange={handleChangeItemsPage}
                          count={Math.ceil(
                              items.length / SEARCH_ELEMENTS_PER_PAGE)} />
            </Box>
        }
        {
            (items.length === 0 && collections.length === 0) &&
            <Stack className="found-nothing"
                   alignItems="center" justifyContent="center">
              <Typography color="error" variant="h4">
                {t(CONTENT.SEARCH.FOUND.NOTHING)}
              </Typography>
              <SentimentVeryDissatisfiedIcon color="error" fontSize="large" />
            </Stack>
        }
      </Container>
  );
});