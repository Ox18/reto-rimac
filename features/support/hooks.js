const { Before, After } = require("@cucumber/cucumber");

Before(() => {
  console.log("Iniciando prueba...");
});

After(() => {
  console.log("Prueba completada.");
});
