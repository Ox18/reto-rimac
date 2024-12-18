import { FusionadosController } from "../app/presentation/controllers/FusionadosController";
import { FusionRepository } from "../app/infra/db/repositories/FusionRepository";
import { fusionMock } from "./mocks/fusionMock";
import { findPeopleMock } from "./mocks/findPeopleMock";
import { findFilmMock } from "./mocks/findFilmMock";
import { findMovieMock } from "./mocks/findMovieMock";
import { OMDBService } from "../app/infra/thirdparty/omdb/omdb.service";
import { SwapiService } from "../app/infra/thirdparty/swapi/swapi.service";

jest.mock("../app/infra/db/repositories/FusionRepository");
jest.mock("../app/infra/thirdparty/omdb/omdb.service");
jest.mock("../app/infra/thirdparty/swapi/swapi.service");

describe("Fusionados", () => {
  let fusionRepositoryMock: jest.Mocked<FusionRepository>;
  let omdbServiceMock: jest.Mocked<OMDBService>;
  let swapiServiceMock: jest.Mocked<SwapiService>;
  let controller: FusionadosController;

  beforeEach(() => {
    fusionRepositoryMock =
      new FusionRepository() as jest.Mocked<FusionRepository>;
    omdbServiceMock = new OMDBService() as jest.Mocked<OMDBService>;
    swapiServiceMock = new SwapiService() as jest.Mocked<SwapiService>;

    controller = new FusionadosController(
      swapiServiceMock,
      omdbServiceMock,
      fusionRepositoryMock
    );
  });

  it("Ibtener dato fusionado", async () => {
    fusionRepositoryMock.findFusion.mockResolvedValue(null);
    swapiServiceMock.findPeople.mockResolvedValue(findPeopleMock);
    swapiServiceMock.findFilm.mockResolvedValue(findFilmMock);
    omdbServiceMock.find.mockResolvedValue(findMovieMock);
    fusionRepositoryMock.create.mockResolvedValue(true);

    const result = await controller.handle({
      queryStringParameters: {
        peopleId: "1",
      },
    });

    expect(result.nombre).toEqual(fusionMock.character_name);
    expect(fusionRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(swapiServiceMock.findPeople).toHaveBeenCalledTimes(1);
    expect(omdbServiceMock.find).toHaveBeenCalledTimes(1);
  });
});
