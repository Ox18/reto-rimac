import { FusionadosController } from "../app/presentation/controllers/FusionadosController";
import { FusionRepository } from "../app/infra/db/repositories/FusionRepository";
import { OmdbRepository } from "../app/infra/db/repositories/OmdbRepository";
import { StarWarsRepository } from "../app/infra/db/repositories/StarWarsRepository";
import { fusionMock } from "./mocks/fusionMock";
import { findPeopleMock } from "./mocks/findPeopleMock";
import { findFilmMock } from "./mocks/findFilmMock";
import { findMovieMock } from "./mocks/findMovieMock";

jest.mock("../app/infra/db/repositories/FusionRepository");
jest.mock("../app/infra/db/repositories/OmdbRepository");
jest.mock("../app/infra/db/repositories/StarWarsRepository");

describe("FusionadosController", () => {
  let fusionRepositoryMock: jest.Mocked<FusionRepository>;
  let omdbRepositoryMock: jest.Mocked<OmdbRepository>;
  let starWarsRepositoryMock: jest.Mocked<StarWarsRepository>;
  let controller: FusionadosController;

  beforeEach(() => {
    fusionRepositoryMock =
      new FusionRepository() as jest.Mocked<FusionRepository>;
    omdbRepositoryMock = new OmdbRepository() as jest.Mocked<OmdbRepository>;
    starWarsRepositoryMock =
      new StarWarsRepository() as jest.Mocked<StarWarsRepository>;

    controller = new FusionadosController(
      starWarsRepositoryMock,
      omdbRepositoryMock,
      fusionRepositoryMock
    );
  });

  it("debería retornar los datos fusionados correctamente", async () => {
    fusionRepositoryMock.findFusion.mockResolvedValue(null);
    starWarsRepositoryMock.findPeople.mockResolvedValue(findPeopleMock);

    starWarsRepositoryMock.findFilm.mockResolvedValue(findFilmMock);

    omdbRepositoryMock.find.mockResolvedValue(findMovieMock);
    fusionRepositoryMock.create.mockResolvedValue(true);

    const result = await controller.handle({});

    expect(result.character_name).toEqual(fusionMock.character_name);
    expect(fusionRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(starWarsRepositoryMock.findPeople).toHaveBeenCalledTimes(1);
    expect(omdbRepositoryMock.find).toHaveBeenCalledTimes(1);
  });
});
