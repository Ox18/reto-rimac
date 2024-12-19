const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const { default: axios } = require("axios");

Given("[almacenar] que tengo los siguientes datos:", function (dataTable) {
  const data = dataTable.rowsHash();
  this.payload = {
    name: data.nombre,
    lastname: data.apellido,
  };
});

When(
  "[almacenar] envío una solicitud POST al endpoint {string}",
  async function (endpoint) {
    const baseUrl =
      "http://localhost:3000/dev";
    const url = `${baseUrl}${endpoint}`;
    this.response = await axios.post(url, this.payload);
  }
);

Then(
  "[almacenar] el estado de la respuesta debe ser {int}",
  function (statusCode) {
    assert.strictEqual(this.response.status, statusCode);
  }
);
