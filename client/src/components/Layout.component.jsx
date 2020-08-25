import React from "react";

import Header from "./Header.component";
import Navigation from "./Navigation.component";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Navigation />
      <div className="wrapper-content">
        <div className="wrapper-main">{children}</div>
      </div>
    </>
  );
};

export default Layout;
