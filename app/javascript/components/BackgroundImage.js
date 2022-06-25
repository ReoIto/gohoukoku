import React from "react";
import { backgroundImages } from "../constants/background_images";

export default function BackgroundImage({ backgroundImgKind }) {
  const imgFileName = getImgFileName(backgroundImgKind);

  function getImgFileName(backgroundImgKind) {
    return backgroundImages.find(
      (img) => img.KIND === Number(backgroundImgKind)
    ).FILE_NAME;
  }

  return (
    <img
      src={imgFileName}
      className="img-fluid d-block mx-auto card-img rounded"
    />
  );
}
