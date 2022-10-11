const axios = require("axios");

class Busquedas {
  // historial = [Tegucigalpa];

  constructor() {
    // leer DB si existe
  }

  get paramsMaxbox() {
    return {
      access_token: process.env.MAPBOX_KEY,

      limit: 5,
      language: "es",
    };
  }
  get paramsWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }

  async ciudad(lugar = "") {
    try {
      //peticion http

      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,

        params: this.paramsMaxbox,
      });

      const resp = await instance.get();

      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));

      return []; // retornar los lugares
    } catch (error) {
      return [];
    }
  }

  async climaLugar(lat, lon) {
    try {
      //instance axios.create
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,

        params: { ...this.paramsWeather, lat, lon },
      });

      //resp
      const resp = await instance.get();
      const {
        weather,
        main: { temp_min, temp_max, temp },
      } = resp.data;

      return {
        desc: weather[0].description,
        min: temp_min,
        max: temp_max,
        temp: temp,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Busquedas;
