import AddCircleOutlineOutlinedIcon
                                                    from "@mui/icons-material/AddCircleOutlineOutlined";
import {Container, Grid, Pagination, Typography}    from "@mui/material";
import {observer}                                   from "mobx-react-lite";
import {useEffect, useState}                        from "react";
import {useTranslation}                             from "react-i18next";
import {CollectionModal}                            from "../../Components";
import {
  CollectionPreview
}                                                   from "../../Components/Cards/CollectionPreview";
import {ACTIONS, CONTENT, OWN_COLLECTIONS_PER_PAGE} from "../../Constants";
import {useStore}                                   from "../../Hooks";
import {getOwnCollections}                          from "../../Services";
import {scrollToTop}                                from "../../Utils";
import "./Styles/Collections.scss";

export const OwnCollections = observer(() => {
  const {t} = useTranslation();
  const [page, setPage] = useState(1);
  const collectionStore = useStore("collectionStore");
  const ownCollections = collectionStore.getOwnCollections();
  const start = (page - 1) * OWN_COLLECTIONS_PER_PAGE;
  const end = page * OWN_COLLECTIONS_PER_PAGE;
  const handleChangePage = (_event, value) => {
    setPage(value);
    scrollToTop();
  };
  useEffect(() => {
    const fetchData = async () => {
      await getOwnCollections();
    };
    fetchData().catch(error => console.error(error));
  }, []);
  return (
      <Container className="collections-container">
        <Typography color="primary" variant="h4" className="collections-title">
          <strong>{t(CONTENT.OWN_COLLECTIONS.TITLE)}</strong>
        </Typography>
        <Grid container spacing={2} padding={1} marginY={1}>
          <Grid item xs={10} md={3}>
            <CollectionModal
                action={ACTIONS.CREATE}
                buttonClassName="create-collection-button"
                buttonIcon={<AddCircleOutlineOutlinedIcon fontSize="large" />}
                onSuccess={() => setPage(1)}
            />
          </Grid>
          {
            [...ownCollections].slice(start, end)
            .map((collection) => (
                <CollectionPreview key={collection.id}
                                   collection={collection} />
            ))
          }
        </Grid>
        {
            ownCollections.length > 0 &&
            <Pagination color={"primary"} className="pagination-bar"
                        variant="outlined" shape="rounded"
                        page={page}
                        onChange={handleChangePage}
                        count={Math.ceil(
                            ownCollections.length
                            / OWN_COLLECTIONS_PER_PAGE)} />
        }
      </Container>
  );
});