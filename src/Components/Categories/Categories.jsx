import React, { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import MyLoader from "./../Loading/MyLoader";
import GameItem from "./../GameItem/GameItem";
import classes from "./Categories.module.css";
import { Helmet } from "react-helmet";

const initialGamesState = {
  allGames: [],
  displayedGames: [],
};

function gamesReducerFn(state, action) {
  if (action.name === "first update") {
    return { allGames: action.allGames, displayedGames: action.displayedGames };
  }
  if (action.name === "gameNumber update") {
    return { allGames: state.allGames, displayedGames: action.displayedGames };
  }
  return initialGamesState;
}

function Categories() {
  const [isLoading, setIsLoading] = useState(false);
  const [gamesNumber, setGamesNumber] = useState(1);
  const [Games, dispatchGames] = useReducer(gamesReducerFn, initialGamesState);
  const params = useParams();
  const category = params.cat;

  async function getDataFromApi(category) {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
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
        name: "first update",
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
    getDataFromApi(category);
  }, [category]);

  useEffect(() => {
    dispatchGames({
      name: "gameNumber update",
      displayedGames: Games.allGames.slice(0, 16 * gamesNumber),
    });
    // setDisplayedGames(allGames.slice(0, 16 * gamesNumber));
  }, [gamesNumber]);

  return (
    <section className={classes.allGamesContainer}>
      <Helmet>
        <title>Categories - {category}</title>
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
          {Games.displayedGames.map((game) => {
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
            {Games.allGames.length !== Games.displayedGames.length ? (
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

export default Categories;
