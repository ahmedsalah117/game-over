import React, { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import MyLoader from "./../Loading/MyLoader";
import GameItem from "./../GameItem/GameItem";
import classes from "./SortBy.module.css";
import { Helmet } from "react-helmet";
const initialGames = {
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

  return initialGames;
}

function SortBy() {
  const [isLoading, setIsLoading] = useState(false);
  const [gamesNumber, setGamesNumber] = useState(1);
  const [games, gamesDispatch] = useReducer(gamesReducerFn, initialGames);
  const params = useParams();
  const sortBy = params.sort;

  async function getDataFromApi(sortBy) {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${sortBy}`,
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

      gamesDispatch({
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
    getDataFromApi(sortBy);
  }, [sortBy]);

  useEffect(() => {
    gamesDispatch({
      name: "gamesNumberUpdate",
      displayedGames: games.allGames.slice(0, 16 * gamesNumber),
    });
  }, [gamesNumber]);

  return (
    <section className={classes.allGamesContainer}>
      <Helmet>
        <title>Sort by - {sortBy}</title>
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
          {games.displayedGames.slice(0, 16 * gamesNumber).map((game) => {
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
            {games.displayedGames.length !== games.allGames.length ? (
              <button
                onClick={() => {
                  return setGamesNumber((prevNumber) => 2 * prevNumber);
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

export default SortBy;
