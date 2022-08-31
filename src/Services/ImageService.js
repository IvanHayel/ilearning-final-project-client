import InitialImage   from "../Assets/Images/NoImage.png";
import {RANDOM_IMAGE} from "../Constants";

export const getRandomImage = () => {
  const url = RANDOM_IMAGE.URL
  .concat(RANDOM_IMAGE.SIZE);
  return getImageObjectUrl(url);
}

export const getImageObjectUrl = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

export const toUrlOrDefault = (imageLink) => {
  try {
    return URL.createObjectURL(imageLink);
  } catch (error) {
    return InitialImage;
  }
}
