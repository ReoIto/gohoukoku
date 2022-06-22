import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function New() {
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
          <div>
            <input
              class="form-check-input"
              type="radio"
              name="backgroundImageBlack"
              id="backgroundImageBlack"
              value={1}
              checked
            />
            <label class="form-check-label" for="backgroundImageBlack">
              黒
            </label>
            <input
              class="form-check-input"
              type="radio"
              name="backgroundImageRed"
              id="backgroundImageRed"
              value={2}
            />
            <label class="form-check-label" for="backgroundImageRed">
              赤
            </label>
          </div>
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  );
}
