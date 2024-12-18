import { HistorialController } from "../app/presentation/controllers/HistorialController";
import { FusionRepository } from "../app/infra/db/repositories/FusionRepository";
import { paginatedMock } from "./mocks/paginatedMock";

jest.mock("../app/infra/db/repositories/FusionRepository");

describe("Historial", () => {
  let fusionRepositoryMock: jest.Mocked<FusionRepository>;
  let controller: HistorialController;

  beforeEach(() => {
    fusionRepositoryMock =
      new FusionRepository() as jest.Mocked<FusionRepository>;

    controller = new HistorialController(fusionRepositoryMock);
  });

  it("Obtener lista de historial", async () => {
    fusionRepositoryMock.paginated.mockResolvedValue(paginatedMock);

    const result = await controller.handle({});

    expect(result.data.length).toEqual(6);
    expect(fusionRepositoryMock.paginated).toHaveBeenCalledTimes(1);
  });
});
