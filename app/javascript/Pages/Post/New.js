import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import BackgroundImageRadioButtons from "../../components/BackgroundImageRadioButtons";
import BackgroundImage from "../../components/BackgroundImage";

export default function New({ resultErrors }) {
  const [values, setValues] = useState({
    content: "",
    backgroundKind: "",
  });

  const [backgroundImgKind, setBackgroundImgKind] = useState(1);

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    setValues((values) => ({
      ...values,
      [key]: value,
    }));

    if (key === "backgroundKind" && value) {
      setBackgroundImgKind(value);
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
    <>
      <div className="text-center">
        <h1>画像を作成</h1>
        {resultErrors && <div>{resultErrors}</div>}
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>背景の画像を選択してください</label>
            <br />
            <BackgroundImageRadioButtons onChange={handleChange} />
          </div>
          <div className="form-group col-5 mx-auto">
            <label>ご報告したい内容を入力してください</label>
            <textarea
              value={values.content}
              onChange={(e) => handleChange(e)}
              name="content"
              cols={60}
              rows={7}
              className="form-control form-control-lg"
            />
          </div>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
      <div className="card w-50 h-auto mx-auto">
        <BackgroundImage backgroundImgKind={backgroundImgKind} />
        <div className="card-img-overlay text-center">
          <p className="text-white">{values.content}</p>
        </div>
      </div>
    </>
  );
}
