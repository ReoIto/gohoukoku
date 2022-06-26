import React from "react";
import BackgroundImage from "./BackgroundImage";

export default function PreviewImage({ backgroundImgKind, content }) {
  return (
    <div className="card w-50 h-auto mx-auto">
      <BackgroundImage backgroundImgKind={backgroundImgKind} />
      <div className="card-img-overlay text-center">
        <p
          className="text-white"
          style={{
            whiteSpace: "pre-wrap",
            fontSize: "90px",
            fontFamily: "ヒラギノ明朝 ProN",
          }}
        >
          {content}
        </p>
      </div>
    </div>
  );
}
