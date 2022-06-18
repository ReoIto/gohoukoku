import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function New() {
  const [values, setValues] = useState({
    content: "",
    imgPath: "",
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
      img_path: values.imgPath,
      background_kind: values.backgroundKind,
    };
    Inertia.post("/posts", data);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <p>ここにcontentを入れる</p>
      <input
        type="text"
        name="content"
        value={values.content}
        onChange={(e) => handleChange(e)}
      />
      <p>backgroundKind -- black</p>
      <input
        type="radio"
        name="backgroundKind"
        value={1}
        onChange={(e) => handleChange(e)}
      />
      <button type="submit">SUBMIT</button>
    </form>
  );
}
