import React, { useState, useContext } from "react";
import classes from "./Navbar.module.css";
import LogoPic from "../../Assets/Images/logo.png";
import { Link, redirect, useNavigate, useNavigation } from "react-router-dom";
import { navbarContext } from "../../Store/Navbar-context.js";
function Navbar() {
  const navbarContextData = useContext(navbarContext);
  const navigate = useNavigate();

  function logOutHandler() {
    localStorage.removeItem("userToken");

    navigate("/login");
  }

  const HomeNavBar = (
    // <section
    //   className={classes.pageAllignment}
    //   onClick={(e) => {
    //     return hidePlatform(e);
    //   }}>

    <section className={classes["nav-element-container"]}>
      <nav
        className={classes.Homenavbar}
        onClick={navbarContextData.hideSubListsHandler}
      >
        <div className={classes.HomelogoContainer}>
          <img src={LogoPic} alt="" />

          <p>
            <Link style={{ display: "block" }} to="/">
              Game Over
            </Link>
          </p>
        </div>

        <ul className={classes.homePageList}>
          <li>
            <Link to="/">Home </Link>
          </li>
          <li>
            <Link to="/allgames">All </Link>
          </li>
        </ul>
        <ul className={classes.platformUlContainer}>
          <li
            onClick={() => {
              return navbarContextData.setPlatformShown(
                (prevState) => !prevState
              );
            }}
            className={classes.platformList}
          >
            Platforms
            {navbarContextData.platformShown ? (
              <ul className={classes.pc}>
                <li>
                  <Link to="/platform/pc">PC</Link>
                </li>
                <li>
                  <Link to="/platform/browser">Browser</Link>
                </li>
              </ul>
            ) : (
              ""
            )}
          </li>

          <li
            className={classes.sortby}
            onClick={() => {
              return navbarContextData.setSortByShown(
                (prevState) => !prevState
              );
            }}
          >
            Sort-by
            {navbarContextData.sortByShown ? (
              <ul className={classes.sortByDrop}>
                <li>
                  <Link to="/sortby/release-date">release-date</Link>
                </li>
                <li>
                  <Link to="/sortby/popularity">popularity</Link>
                </li>
                <li>
                  <Link to="/sortby/alphabetical">alphabetical</Link>
                </li>
                <li>
                  <Link to="/sortby/relevance">relevance</Link>
                </li>
              </ul>
            ) : (
              ""
            )}
          </li>
          <li
            className={classes.categories}
            onClick={() => {
              return navbarContextData.setCategoriesShown(
                (prevState) => !prevState
              );
            }}
          >
            Categories
            {navbarContextData.categoriesShown ? (
              <ul className={classes.sortByDrop}>
                <li>
                  <Link to="/category/racing">racing</Link>
                </li>
                <li>
                  <Link to="/category/sports">sports</Link>
                </li>
                <li>
                  <Link to="/category/social">social</Link>
                </li>
                <li>
                  <Link to="/category/open-world">open-world</Link>
                </li>
                <li>
                  <Link to="/category/zombie">zombie</Link>
                </li>
                <li>
                  <Link to="/category/fantasy">fantasy</Link>
                </li>
                <li>
                  <Link to="/category/action-rpg">action-rpg</Link>
                </li>
                <li>
                  <Link to="/category/action">action</Link>
                </li>
                <li>
                  <Link to="/category/flight">flight</Link>
                </li>
                <li>
                  <Link to="/category/battle-royale">battle-royale</Link>
                </li>
              </ul>
            ) : (
              ""
            )}
          </li>
        </ul>

        <div className={classes.logOutBtnContainer}>
          <button onClick={logOutHandler} className={classes.LogOutBtn}>
            Log out
          </button>
        </div>

        <div className={classes["nav-icon-container"]}>
          <button
            onClick={() => {
              navbarContextData.setUlIsShown((prevState) => !prevState);
            }}
            className={classes["nav-icon"]}
          ></button>
        </div>
      </nav>
      {navbarContextData.ulIsShown ? (
        <ul
          className={classes["mini-nav-menu"]}
          onClick={navbarContextData.hideSubListsHandler}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/allgames">All</Link>
          </li>
          <li
            onClick={() => {
              return navbarContextData.setPlatformShown(
                (prevState) => !prevState
              );
            }}
            className={classes.platformList}
          >
            Platforms
            {navbarContextData.platformShown ? (
              <ul className={classes["mini-platform-menu"]}>
                <li>
                  <Link to="/platform/pc">PC</Link>
                </li>
                <li>
                  <Link to="/platform/browser">Browser</Link>
                </li>
              </ul>
            ) : (
              ""
            )}
          </li>
          <li
            onClick={() => {
              return navbarContextData.setSortByShown(
                (prevState) => !prevState
              );
            }}
            className={classes.sortby}
          >
            Sort-by
            {navbarContextData.sortByShown ? (
              <ul className={classes["sort-by-mini-menu"]}>
                <li>
                  <Link to="/sortby/release-date">release-date</Link>
                </li>
                <li>
                  <Link to="/sortby/popularity">popularity</Link>
                </li>
                <li>
                  <Link to="/sortby/alphabetical">alphabetical</Link>
                </li>
                <li>
                  <Link to="/sortby/relevance">relevance</Link>
                </li>
              </ul>
            ) : (
              ""
            )}
          </li>
          <li
            onClick={() => {
              return navbarContextData.setCategoriesShown(
                (prevState) => !prevState
              );
            }}
            className={classes.categories}
          >
            Categories
            {navbarContextData.categoriesShown ? (
              <ul className={classes["category-mini-menu"]}>
                <li>
                  <Link to="/category/racing">racing</Link>
                </li>
                <li>
                  <Link to="/category/sports">sports</Link>
                </li>
                <li>
                  <Link to="/category/social">social</Link>
                </li>
                <li>
                  <Link to="/category/open-world">open-world</Link>
                </li>
                <li>
                  <Link to="/category/zombie">zombie</Link>
                </li>
                <li>
                  <Link to="/category/fantasy">fantasy</Link>
                </li>
                <li>
                  <Link to="/category/action-rpg">action-rpg</Link>
                </li>
                <li>
                  <Link to="/category/action">action</Link>
                </li>
                <li>
                  <Link to="/category/flight">flight</Link>
                </li>
                <li>
                  <Link to="/category/battle-royale">battle-royale</Link>
                </li>
              </ul>
            ) : (
              ""
            )}
          </li>

          <button
            onClick={() => {
              logOutHandler();
            }}
            className={classes.LogOutBtn}
          >
            Log out
          </button>
        </ul>
      ) : (
        ""
      )}
    </section>
    // </section>
  );

  const GuestNavBar = (
    <nav className={classes.navbar}>
      <div className={classes["guest-nav-center"]}>
        <div className={classes.logoContainer}>
          <img src={LogoPic} alt="" />
          <p>Game Over</p>
        </div>

        <div className={classes.buttonsHolder}>
          <button className={classes.joinFreeBtn}>
            <Link to="/register">Join Free</Link>
          </button>
        </div>
      </div>
    </nav>
  );

  if (localStorage.getItem("userToken")) {
    return HomeNavBar;
  } else {
    return GuestNavBar;
  }
}

export default Navbar;
