import React from "react";
import { Link } from "@inertiajs/inertia-react";

const Layout = ({ children }) => {
  return (
    <main>
      <header>
        <Link preserveScroll href="/">
          Home
        </Link>
        <Link preserveScroll href="/about">
          About
        </Link>
        <Link preserveScroll href="/contact">
          Contact
        </Link>
      </header>
      {children}
    </main>
  );
};

export default (page) => <Layout>{page}</Layout>;
