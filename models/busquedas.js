const axios = require("axios");

class Busquedas {
  // historial = [Tegucigalpa];

  constructor() {
    // leer DB si existe
  }

  get paramsMaxbox() {
    return {
      access_token:
        "pk.eyJ1Ijoiam9yZ2VhcmJlbGFleiIsImEiOiJjbDkzMG5rdzgwYjBhM3Vudjc5enRrNWZuIn0.9Ui2Lu_4WReDvMEKaRa0Xw",
      limit: 5,
      language: "es",
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

      console.log(resp.data);

      return []; // retornar los lugares
    } catch (error) {
      return [];
    }
  }
}

module.exports = Busquedas;
