import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function Show({ post, app_url_base, app_name }) {
  return (
    <>
      <div>
        <h1>SHOW</h1>
        <p>{`Created at ${post.created_at}`}</p>
        <img src={post.img_path} alt="Created image" />

        <Link
          href={`https://twitter.com/share?url=${app_url_base}/posts/${post.id}&hashtags=${app_name}`}
          headers={{ "Access-Control-Allow-Origin": "*" }}
        >
          Twitter投稿へ
        </Link>
      </div>
    </>
  );
}
