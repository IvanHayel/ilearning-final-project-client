import {Container, Grid, Pagination, Typography} from "@mui/material";
import {observer}                                from "mobx-react-lite";
import {useEffect, useState}                     from "react";
import {useTranslation}                          from "react-i18next";
import {
  CollectionPreview
}                                                from "../../Components/Cards/CollectionPreview";
import {COLLECTIONS_PER_PAGE, CONTENT}           from "../../Constants";
import {useStore}                                from "../../Hooks";
import {getCollections}                          from "../../Services";
import {scrollToTop}                             from "../../Utils";
import "./Styles/Collections.scss";

export const GlobalCollections = observer(() => {
  const {t} = useTranslation();
  const [page, setPage] = useState(1);
  const collectionStore = useStore("collectionStore");
  const collections = collectionStore.getCollections();
  const start = (page - 1) * COLLECTIONS_PER_PAGE;
  const end = page * COLLECTIONS_PER_PAGE;
  const handleChangePage = (_event, value) => {
    setPage(value);
    scrollToTop();
  };
  useEffect(() => {
    const fetchData = async () => {
      await getCollections();
    };
    fetchData().catch(error => console.error(error));
  }, []);
  return (
      <Container className="collections-container">
        <Typography color="primary" variant="h4" className="collections-title">
          <strong>{t(CONTENT.COLLECTIONS.TITLE)}</strong>
        </Typography>
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