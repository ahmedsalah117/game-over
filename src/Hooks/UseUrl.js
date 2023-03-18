async function UseUrl(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  });

  const responseData = await response.json();

  return responseData;
}

export default UseUrl;
