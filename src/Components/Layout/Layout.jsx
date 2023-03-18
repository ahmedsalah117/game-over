import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./../Navbar/Navbar";
import classes from "./Layout.module.css";
import { useContext } from "react";
import { navbarContext } from "./../../Store/Navbar-context";

function Layout() {
  const navbarContextData = useContext(navbarContext);
 
  return (
    <>
      <Navbar />

      <div
        className={classes["layout-div"]}
        onClick={navbarContextData.hideSubListsHandler}
      
      >
        <Outlet></Outlet>
        
      </div>
    </>
  );
}

export default Layout;
