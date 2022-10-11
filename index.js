require("dotenv").config();
const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas.js");

const main = async () => {
  let opt;

  do {
    //opcion seleccionada por medio de la funcion que imprime menu

    const busquedas = new Busquedas();

    opt = await inquirerMenu();
    console.log({ opt });

    switch (opt) {
      case 1:
        //mostrar mensaje
        const termino = await leerInput("Ciudad: ");

        //Buscar el Lugar
        const lugares = await busquedas.ciudad(termino);

        //Seleccionar el lugar
        const idsel = await listarLugares(lugares);
        if (idsel === "0") continue;

        //guardar en DB

        const lugarSeleccionado = lugares.find((l) => l.id === idsel);

        const { nombre, lng, lat } = lugarSeleccionado;

        busquedas.agregarHistorial(nombre);

        // datos del Clima

        const clima = await busquedas.climaLugar(lat, lng);
        console.log(clima);

        //Mostrar resultados
        console.clear();
        console.log(`\nInformacion de la ciudad\n`.green);
        console.log("ciudad:", nombre);
        console.log("Lat:", lat);
        console.log("Lng:", lng);
        console.log("Temperatura:", clima.temp);
        console.log("Mínima:", clima.min);
        console.log("Maxima:", clima.max);
        console.log("El clima esta:", clima.desc.green);

        break;
      case 2:
        busquedas.historial.forEach((lugar, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx}  ${lugar}`);
        });
        break;
    }

    await pausa();
  } while (opt !== 0);
};

main();
