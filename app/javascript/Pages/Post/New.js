import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import BackgroundImageRadioButtons from "../../components/BackgroundImageRadioButtons";
import PreviewImage from "../../components/PreviewImage";

export default function New({ resultErrors }) {
  const [values, setValues] = useState({
    content: "",
    backgroundKind: 1,
  });

  const [previewBgImgKind, setPreviewBgImgKind] = useState(1);

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    setValues((values) => ({
      ...values,
      [key]: value,
    }));

    if (key === "backgroundKind" && value) {
      setPreviewBgImgKind(value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      content: values.content,
      background_kind: values.backgroundKind,
    };
    Inertia.post("/posts", data);
  }

  return (
    <div className="col-11 col-md-8 col-lg-9 mx-auto">
      <div className="text-center">
        <h1>画像を作成</h1>
        {resultErrors && <div>{resultErrors}</div>}
        <form onSubmit={(e) => handleSubmit(e)} className="">
          <div>
            <label>背景の画像を選択してください</label>
            <br />
            <BackgroundImageRadioButtons onChange={handleChange} />
          </div>
          <div className="form-group mx-auto">
            <label>ご報告したい内容を入力してください</label>
            <textarea
              value={values.content}
              onChange={(e) => handleChange(e)}
              name="content"
              wrap="hard"
              className="form-control form-control-lg mx-auto text-center h-auto"
              style={{ fontSize: "4.5vw", padding: "0 12.5%" }}
            />
          </div>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
      <PreviewImage
        previewBgImgKind={previewBgImgKind}
        content={values.content}
      />
    </div>
  );
}
