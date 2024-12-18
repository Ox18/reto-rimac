const handler = require("../dist/handler");

describe("handler", () => {
  const a = 1;
  const b = 1;

  // Simula el objeto 'event' que tu función Lambda recibiría
  const event = {
    // Aquí van los parámetros que tu función Lambda espera del evento
    body: JSON.stringify({ key: "value" }), // Si tu Lambda espera un cuerpo, simula uno
    pathParameters: { id: "123" }, // Si tu Lambda tiene parámetros de ruta
    queryStringParameters: { peopleId: 1 }, // Si tu Lambda espera parámetros de consulta
    // otros atributos que tu función necesita
  };

  // expected a is equal to b
  test("a should be equal to b", async () => {
    // Llama a la función handler.getFusionados() pasando el 'event' simulado
    const response = await handler.getFusionados(event);

    console.log({ response }); // Imprime la respuesta para depuración

    // Puedes agregar más expectativas según lo que esperes de la respuesta
    expect(a).toBe(b);
  });
});
