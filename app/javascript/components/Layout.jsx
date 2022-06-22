import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};

export default (page) => <Layout>{page}</Layout>;
