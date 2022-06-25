import React from "react";
import { backgroundImages } from "../constants/background_images";

export default function BackgroundImage({ backgroundImgKind }) {
  const backgroundImgName = getBackgroundImgName(backgroundImgKind);

  function getBackgroundImgName(backgroundImgKind) {
    return backgroundImages.find(
      (img) => img.KIND === Number(backgroundImgKind)
    ).NAME;
  }

  return <img src={backgroundImgName} className="img-fluid d-block mx-auto" />;
}
