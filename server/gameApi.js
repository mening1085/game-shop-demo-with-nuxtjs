import axios from "axios";

const get = (config, params) => {
  console.log("gameApi params", params);
  return axios.get(
    "https://free-to-play-games-database.p.rapidapi.com/api/games",
    {
      params: params,
      headers: {
        "x-rapidapi-key": config.public.rapidApiKey,
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    }
  );
};

const detail = (config, id) => {
  return axios.get(
    "https://free-to-play-games-database.p.rapidapi.com/api/game",
    {
      params: { id: id },
      headers: {
        "x-rapidapi-key": config.public.rapidApiKey,
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    }
  );
};

export default {
  get,
  detail,
};
