import React from "react";
import { Link } from "react-router-dom";
import classes from "./GameItem.module.css";
function GameItem(props) {
  const platform =
    props.platform === "PC (Windows)"
      ? "Available on Windows"
      : "Available on Browser";
  return (
    <>
      <Link
        title={platform}
        className={classes.gameItem}
        to={props.url}
        target="_blank"
      >
        <div className={classes.card}>
          <div>
            <img src={props.image} alt="Naruto image" />
          </div>

          <div className={classes.gameDetailContainer}>
            <p className={classes.Naruto}>
              <span>{props.title}</span>&nbsp;&nbsp;
              <span>Free</span>
            </p>
            <h5 className={classes.gameDesc}>{props.desc} ...</h5>
            <div className={classes.gamePlus}>
              <i className="fas fa-plus-square fa-xl"></i>
              <span className={classes["genreandwindowsContainer"]}>
                <span className={classes.gameGenre}>{props.genre}</span>
                <i
                  className={`fa-brands ${
                    platform === "Available on Windows"
                      ? "fa-windows"
                      : "fa-internet-explorer"
                  }`}
                ></i>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default GameItem;
