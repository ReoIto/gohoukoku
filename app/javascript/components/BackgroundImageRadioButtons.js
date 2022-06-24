import React from "react";
import BackgroundImageRadioButton from "./BackgroundImageRadioButton";

export default function BackgroundImagesRadioButtons({ onChange }) {
  const backgroundImages = [
    {
      kind: 1,
      label: "黒",
    },
    {
      kind: 2,
      label: "赤",
    },
  ];

  return backgroundImages.map((backgroundImage) => {
    return (
      <BackgroundImageRadioButton
        onChange={onChange}
        kindNum={backgroundImage.kind}
        label={backgroundImage.label}
        key={backgroundImage.kind}
      />
    );
  });
}
