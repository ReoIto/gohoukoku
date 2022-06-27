import React from "react";
import BackgroundImage from "./BackgroundImage";

export default function PreviewImage({ previewBgImgKind, content }) {
  const font = "ヒラギノ明朝 ProN";

  return (
    <div className="card mx-auto">
      <BackgroundImage previewBgImgKind={previewBgImgKind} />
      <div className="card-img-overlay text-center">
        <p className="text-white" style={{ fontSize: "5vw", fontFamily: font }}>
          【ご報告】
        </p>
        <p
          className="text-white card-text position-absolute top-50 start-50 translate-middle w-75"
          style={{
            whiteSpace: "pre-wrap",
            fontSize: "4.5vw",
            fontFamily: font,
          }}
        >
          {content}
        </p>
      </div>
    </div>
  );
}
