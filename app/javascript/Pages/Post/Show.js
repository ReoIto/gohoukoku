import React from "react";

export default function Show({ post }) {
  return (
    <div>
      <h1>SHOW</h1>
      <p>{`Created at ${post.created_at}`}</p>
      <img src={post.img_path} alt="Created image" />
    </div>
  );
}
