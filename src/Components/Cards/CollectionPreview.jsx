import SettingsIcon          from '@mui/icons-material/Settings';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography
}                            from "@mui/material";
import {
  observer
}                            from "mobx-react-lite";
import {useEffect, useState} from "react";
import {
  useTranslation
}                            from "react-i18next";
import {
  useNavigate
}                            from "react-router-dom";
import {
  ACTIONS,
  CONTENT,
  HTTP_STATUS,
  ROUTE_URL
}                            from "../../Constants";
import {
  deleteCollection,
  getImageObjectUrl,
  isEnoughRights
}                            from "../../Services";
import {DeleteDialog}        from "../Dialogs";
import {CollectionModal}     from "../Modals";
import "./Styles/CardPreview.scss";

export const CollectionPreview = observer((props) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {collection, onEdit, onDelete} = props;
  const [imageUrl, setImageUrl] = useState(null);
  const [isImageLoading, setImageLoading] = useState(true);
  const handleCollectionClick = () => {
    const url = `${ROUTE_URL.COLLECTIONS.GLOBAL}/${collection.name}`;
    navigate(url);
  }
  const handleDeleteConfirm = async () => {
    const response = await deleteCollection(collection.id, collection.name);
    response.status === HTTP_STATUS.OK && (onDelete && onDelete());
  }
  const handleEditCollectionSuccess = async () => {
    setImageLoading(true);
    setImageUrl(await getImageObjectUrl(collection.imageLink));
    setImageLoading(false);
    onEdit && onEdit();
  }
  useEffect(() => {
    const fetchData = async () => {
      setImageLoading(true);
      setImageUrl(await getImageObjectUrl(collection.imageLink));
      setImageLoading(false);
    }
    fetchData().catch((error) => console.error(error));
  }, [collection.imageLink]);
  return (
      <Grid item xs={10} md={3}>
        <Card className="preview">
          <CardActionArea color="secondary" onClick={handleCollectionClick}>
            {
              isImageLoading
                  ? <CircularProgress className="preview-loading-spinner" />
                  : <CardMedia className="preview-image"
                               image={imageUrl} alt={collection.name} />
            }
            <CardContent>
              <Typography className="preview-info"
                          color="secondary.light" variant="h4">
                {collection.name}
              </Typography>
              <Typography className="preview-info" variant="h6">
                <strong>{t(CONTENT.COLLECTION_PREVIEW.OWNER)}</strong>
                <i>{collection.owner.username}</i>
              </Typography>
              <Typography className="preview-info" variant="h6">
                <strong>{t(CONTENT.COLLECTION_PREVIEW.THEME)}</strong>
                <i>{collection.theme.name}</i>
              </Typography>
              <Typography variant="caption" fontSize="small" fontWeight="bold">
                <i>{t(CONTENT.COLLECTION_PREVIEW.CREATED)}</i>
                <i>{new Date(collection.createDate).toLocaleString()}</i>
              </Typography>
              <br />
              <Typography variant="caption" fontSize="small" fontWeight="bold">
                <i>{t(CONTENT.COLLECTION_PREVIEW.MODIFIED)}</i>
                <i>{new Date(collection.updateDate).toLocaleString()}</i>
              </Typography>
            </CardContent>
          </CardActionArea>
          {
              isEnoughRights(collection.owner.id, collection.owner.username) &&
              <CardActions className="preview-buttons">
                <CollectionModal
                    color="info"
                    action={ACTIONS.EDIT}
                    buttonIcon={<SettingsIcon />}
                    collection={{...collection, imageLink: imageUrl}}
                    onSuccess={handleEditCollectionSuccess}
                />
                <DeleteDialog
                    itemToDelete={t(CONTENT.COLLECTION_PREVIEW.COLLECTION)}
                    onConfirmDelete={handleDeleteConfirm}
                />
              </CardActions>
          }
        </Card>
      </Grid>
  );
});