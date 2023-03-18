import React, { useEffect, useState } from "react";
import FreeToPlay from "../FreeToPlay/FreeToPlay.jsx";
import classes from "./Home.module.css";
import GameItem from "./../GameItem/GameItem";
import MyLoader from "./../Loading/MyLoader";
import { Helmet } from "react-helmet";
function Home() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getDataFromApi() {
    setIsLoading(true);
    try {
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
      setGames(responseData.slice(0, 4));
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      window.alert("Data Loading Failed. Please refresh the page.");
    }
  }
  useEffect(() => {
    getDataFromApi();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <FreeToPlay />
      <div className={classes.personalized}>
        <h3>
          <i className="fa-solid fa-robot"></i> &nbsp;Personalized
          Recommendations
        </h3>
        <div className={classes.cardContainer}>
          {isLoading ? (
            <>
              <MyLoader />
              <MyLoader />
              <MyLoader />
              <MyLoader />
            </>
          ) : (
            games.map((game) => (
              <GameItem
                key={game.title}
                title={game.title}
                image={game.thumbnail}
                desc={game.short_description.trim("").slice(0, 20)}
                genre={game.genre}
                url={game.freetogame_profile_url}
                platform={game.platform}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
