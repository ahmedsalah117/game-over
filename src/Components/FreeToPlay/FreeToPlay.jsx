import React from "react";
import classes from "./FreeToPlay.module.css";
import { Link } from "react-router-dom";
function FreeToPlay() {
  return (
    <section className={classes.trackSection}>
      <h1>
        Find & track the best <span>free-to-play</span> games!
      </h1>
      <h2>
        Track what you've played and search for what to play next! Plus get free
        premium loot!
      </h2>
      <button>
        <Link to="/allgames">Browse Games</Link>
      </button>
    </section>
  );
}

export default FreeToPlay;
