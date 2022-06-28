import React from "react";

export default function Show({ post, app_url_base, app_name }) {
  return (
    <>
      <div className="center-block">
        <div>
          <p className="fs-2 fst-italic text-center m-5">ご報告</p>
          <img
            src={post.img_path}
            alt="Created image"
            className="img-fluid d-block mx-auto"
          />
          <p className="text-center mt-5">
            <a
              href={`https://twitter.com/share?url=${app_url_base}/posts/new&hashtags=${app_name}`}
              target="_blank"
              data-show-count="false"
              role="button"
              className="btn btn-info text-white"
            >
              twitterに投稿
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
