import React from "react";
import BackgroundImageRadioButton from "./BackgroundImageRadioButton";

export default function BackgroundImagesRadioButtons({ onChange }) {
  const backgroundImgInfo = [
    {
      kind: 1,
      label: "黒",
    },
    {
      kind: 2,
      label: "赤",
    },
  ];

  return backgroundImgInfo.map((backgroundImg) => {
    return (
      <BackgroundImageRadioButton
        onChange={onChange}
        kindNum={backgroundImg.kind}
        label={backgroundImg.label}
        key={backgroundImg.kind}
      />
    );
  });
}
