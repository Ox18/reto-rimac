const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const { default: axios } = require("axios");

Given(
  "[historial] que tengo la página {string} y el límite {string}",
  function (page, limit) {
    this.page = page;
    this.limit = limit;
  }
);

When("[historial] envío una solicitud GET al endpoint {string}", async function (endpoint) {
  const baseUrl = "https://el0vyj5gjl.execute-api.us-east-1.amazonaws.com/dev";
  const url = `${baseUrl}${endpoint}?page=${this.page}&limit=${this.limit}`;

  this.response = await axios.get(url);
});

Then("[historial] el estado de la respuesta debe ser {int}", function (statusCode) {
  assert.strictEqual(this.response.status, statusCode);
});
