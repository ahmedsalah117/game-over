import React from "react";
import { useEffect, useState, useReducer, useContext } from "react";
import GameItem from "../GameItem/GameItem.jsx";
import classes from "./AllGames.module.css";
import MyLoader from "./../Loading/MyLoader";
import { Helmet } from "react-helmet";
const initialGamesState = {
  allGames: [],
  displayedGames: [],
};

function gamesReducerFn(state, action) {
  if (action.name === "first_time") {
    return { allGames: action.allGames, displayedGames: action.displayedGames };
  }

  if (action.name === "gamesNumberUpdate") {
    return { allGames: state.allGames, displayedGames: action.displayedGames };
  }

  return initialGamesState;
}

function AllGames() {
  const [isLoading, setIsLoading] = useState(false);
  const [gamesNumber, setGamesNumber] = useState(1);
  const [games, dispatchGames] = useReducer(gamesReducerFn, initialGamesState);

  async function getDataFromApi() {
    try {
      setIsLoading(true);

      const response = await fetch(
        "https://free-to-play-games-database.p.rapidapi.com/api/games",
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
            "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
          },
        }
      );

      const responseData = await response.json();

      dispatchGames({
        name: "first_time",
        allGames: responseData,
        displayedGames: responseData.slice(0, 16),
      });
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      window.alert("Data Loading Failed. Please refresh the page.");
    }
  }

  useEffect(() => {
    getDataFromApi();
  }, []);

  useEffect(() => {
    if (games.allGames.length > 0) {
      dispatchGames({
        name: "gamesNumberUpdate",
        displayedGames: games.allGames.slice(0, 16 * gamesNumber),
      });
    }
  }, [gamesNumber]);

  return (
    <section className={classes.allGamesContainer}>
      <Helmet>
        <title>All Games</title>
      </Helmet>
      {isLoading ? (
        <>
          <MyLoader />
          <MyLoader />
          <MyLoader />
          <MyLoader />
          <MyLoader />
          <MyLoader />
          <MyLoader />
          <MyLoader />
          <MyLoader />
          <MyLoader />
          <MyLoader />
          <MyLoader />
          <MyLoader />
          <MyLoader />
          <MyLoader />
          <MyLoader />
        </>
      ) : (
        <>
          {games.displayedGames.map((game) => {
            return (
              <GameItem
                key={game.title}
                title={game.title}
                image={game.thumbnail}
                desc={game.short_description.trim("").slice(0, 20)}
                genre={game.genre}
                url={game.freetogame_profile_url}
                platform={game.platform}
              />
            );
          })}
          <div className={classes.MoreGamesBtn}>
            {games.allGames?.length !== games.displayedGames?.length ? (
              <button
                onClick={() => {
                  setGamesNumber((prevNumber) => 2 * prevNumber);
                }}
              >
                More Games &rarr;
              </button>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default AllGames;
