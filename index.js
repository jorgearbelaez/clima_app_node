const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
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
        const lugar = await leerInput("Ciudad: ");
        await busquedas.ciudad(lugar);
        //Buscar el Lugar

        //Seleccionar el lugar

        // datos del Clima

        //Mostrar resultados

        console.log(`\nInformacion de la ciudad\n`.green);
        console.log("ciudad:");
        console.log("Lat:");
        console.log("Lng:");
        console.log("Temperatura:");
        console.log("Mínima:");
        console.log("Maxima:");

        break;
      case 2:
        break;

      case 3:
        break;
    }

    await pausa();
  } while (opt !== 0);
};

main();
