import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import BackgroundImageRadioButtons from "../../components/BackgroundImageRadioButtons";

export default function New({ resultErrors }) {
  const [values, setValues] = useState({
    content: "",
    backgroundKind: "",
  });

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    setValues((values) => ({
      ...values,
      [key]: value,
    }));
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
    <div className="text-center">
      <h1>画像を作成</h1>
      {resultErrors && <div>{resultErrors}</div>}
      <form onSubmit={(e) => handleSubmit(e)}>
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
          <BackgroundImageRadioButtons onChange={handleChange} />
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  );
}
