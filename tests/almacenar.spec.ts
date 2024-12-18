import { PersonalizadoRepository } from "../app/infra/db/repositories/PersonalizadoRepository";
import { AlmacenarController } from "../app/presentation/controllers/AlmacenarController";
import { almacenarMock } from "./mocks/almacenarMock";

jest.mock("../app/infra/db/repositories/PersonalizadoRepository");

describe("Almacenar", () => {
  let personalizadoRepositoryMock: jest.Mocked<PersonalizadoRepository>;
  let controller: AlmacenarController;

  beforeEach(() => {
    personalizadoRepositoryMock =
      new PersonalizadoRepository() as jest.Mocked<PersonalizadoRepository>;

    controller = new AlmacenarController(personalizadoRepositoryMock);
  });

  it("Crear un registro personalizado", async () => {
    personalizadoRepositoryMock.create.mockResolvedValue(almacenarMock);

    const result = await controller.handle({
      body: JSON.stringify({
        nombre: "Wilmer",
        apellido: "Delgado",
      }),
    });

    expect(result.body.nombre).toEqual("Wilmer");
    expect(result.body.apellido).toEqual("Delgado");
    expect(result.statusCode).toEqual(201);
    expect(personalizadoRepositoryMock.create).toHaveBeenCalledTimes(1);
  });
});
