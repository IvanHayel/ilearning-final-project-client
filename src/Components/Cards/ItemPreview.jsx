import FavoriteIcon                      from '@mui/icons-material/Favorite';
import FavoriteBorderIcon
                                         from '@mui/icons-material/FavoriteBorder';
import {
  Badge,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Typography
}                                        from "@mui/material";
import {observer}                        from "mobx-react-lite";
import {useEffect, useState}             from "react";
import {useTranslation}                  from "react-i18next";
import {useNavigate}                     from "react-router-dom";
import SimpleBar                         from "simplebar-react";
import {CONTENT, HTTP_STATUS, ROUTE_URL} from "../../Constants";
import {useStore}                        from "../../Hooks";
import {
  deleteItemFromCollection,
  getImageObjectUrl,
  isAuthenticated,
  isEnoughRights,
  likeItem
}                                        from "../../Services";
import {DeleteDialog}                    from "../Dialogs";
import "./Styles/CardPreview.scss";

export const ItemPreview = observer((props) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {collection, item, onDelete, onLike} = props;
  const [imageUrl, setImageUrl] = useState(null);
  const [isImageLoading, setImageLoading] = useState(true);
  const authenticationStore = useStore("authenticationStore");
  const currentUserName = authenticationStore.getCurrentUserName();
  const isLiked = item.likes.some(
      like => like.author.username === currentUserName);
  const handleItemClick = () => {
    const url = `${ROUTE_URL.COLLECTIONS.GLOBAL}/${collection.name}/items/${item.id}`;
    navigate(url);
  }
  const handleDeleteConfirm = async () => {
    const response = await deleteItemFromCollection(collection.name, item);
    response.status === HTTP_STATUS.OK && (onDelete && onDelete());
  };
  const handleLike = async () => {
    const response = await likeItem(collection.name, item);
    response.status === HTTP_STATUS.OK && (onLike && onLike());
  };
  useEffect(() => {
    const fetchData = async () => {
      setImageLoading(true);
      setImageUrl(await getImageObjectUrl(item.imageLink));
      setImageLoading(false);
    }
    fetchData().catch((error) => console.error(error));
  }, [item.imageLink]);
  return (
      <Grid item xs={10} md={3}>
        <Card className="preview">
          <CardActionArea color="secondary" onClick={handleItemClick}>
            {
              isImageLoading
                  ? <CircularProgress className="preview-loading-spinner" />
                  : <CardMedia className="preview-image"
                               image={imageUrl} alt={collection.name} />
            }
            <CardContent>
              <Typography className="preview-title"
                          color="secondary.light" variant="h4">
                {item.name}
              </Typography>
              <SimpleBar className="preview-tags">
                {
                  item.tags.map((tag, index) => (
                      <Chip className="tag" color="secondary"
                            key={index} label={tag.name} />
                  ))
                }
              </SimpleBar>
              <Typography variant="caption" fontSize="small" fontWeight="bold">
                <strong>{t(CONTENT.ITEM_PREVIEW.CREATED)}</strong>
                <i>{new Date(item.createDate).toLocaleString()}</i>
              </Typography>
              <br />
              <Typography variant="caption" fontSize="small" fontWeight="bold">
                <strong>{t(CONTENT.ITEM_PREVIEW.MODIFIED)}</strong>
                <i>{new Date(item.updateDate).toLocaleString()}</i>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className="preview-buttons">
            <IconButton color="info" onClick={handleLike}
                        disabled={!isAuthenticated()}>
              <Badge badgeContent={item.likes.length} color="primary">
                {
                  isLiked
                      ? <FavoriteIcon fontSize="large" />
                      : <FavoriteBorderIcon fontSize="large" />
                }
              </Badge>
            </IconButton>
            {
                isEnoughRights(collection.owner.id, collection.owner.username)
                && <DeleteDialog
                    itemToDelete={t(CONTENT.ITEM_PREVIEW.ITEM)}
                    onConfirmDelete={handleDeleteConfirm}
                />
            }
          </CardActions>
        </Card>
      </Grid>
  );
});