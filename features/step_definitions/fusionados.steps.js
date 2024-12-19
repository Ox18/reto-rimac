const { Given, When, Then } = require("@cucumber/cucumber");
const axios = require("axios");
const assert = require("assert");

let response;

Given("[fusionados] que tengo el peopleId {string}", function (peopleId) {
  this.peopleId = peopleId;
});

When("[fusionados] envío una solicitud GET al endpoint {string}", async function (endpoint) {
  const baseUrl = "http://localhost:3000/dev";
  const url = `${baseUrl}${endpoint}?peopleId=${this.peopleId}`;

  response = await axios.get(url);
});

Then("[fusionados] el estado de la respuesta debe ser {int}", function (statusCode) {
  assert.strictEqual(response.status, statusCode);
});
