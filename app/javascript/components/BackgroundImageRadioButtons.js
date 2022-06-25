import React from "react";
import { backgroundImages } from "../constants/background_images";
import BackgroundImageRadioButton from "./BackgroundImageRadioButton";

export default function BackgroundImagesRadioButtons({ onChange }) {
  return backgroundImages.map((backgroundImg) => {
    return (
      <BackgroundImageRadioButton
        onChange={onChange}
        kindNum={backgroundImg.KIND}
        key={backgroundImg.KIND}
        label={backgroundImg.LABEL}
      />
    );
  });
}
