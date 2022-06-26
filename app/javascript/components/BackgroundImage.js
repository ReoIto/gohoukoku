import React from "react";
import { backgroundImages } from "../constants/background_images";

export default function BackgroundImage({ previewBgImgKind }) {
  const imgFileName = getImgFileName(previewBgImgKind);

  function getImgFileName(imgKind) {
    return backgroundImages.find((img) => img.KIND === Number(imgKind))
      .FILE_NAME;
  }

  return (
    <img
      src={imgFileName}
      className="img-fluid d-block mx-auto card-img rounded"
    />
  );
}
