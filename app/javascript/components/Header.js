import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/posts/new">
            ご報告 - Gohoukoku -
          </Link>
        </div>
      </nav>
    </header>
  );
}
