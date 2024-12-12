"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FusionadosController_1 = require("../app/presentation/controllers/FusionadosController");
const FusionRepository_1 = require("../app/infra/db/repositories/FusionRepository");
const OmdbRepository_1 = require("../app/infra/db/repositories/OmdbRepository");
const StarWarsRepository_1 = require("../app/infra/db/repositories/StarWarsRepository");
const fusionMock_1 = require("./mocks/fusionMock");
const findPeopleMock_1 = require("./mocks/findPeopleMock");
const findFilmMock_1 = require("./mocks/findFilmMock");
const findMovieMock_1 = require("./mocks/findMovieMock");
jest.mock("../app/infra/db/repositories/FusionRepository");
jest.mock("../app/infra/db/repositories/OmdbRepository");
jest.mock("../app/infra/db/repositories/StarWarsRepository");
describe("FusionadosController", () => {
    let fusionRepositoryMock;
    let omdbRepositoryMock;
    let starWarsRepositoryMock;
    let controller;
    beforeEach(() => {
        fusionRepositoryMock =
            new FusionRepository_1.FusionRepository();
        omdbRepositoryMock = new OmdbRepository_1.OmdbRepository();
        starWarsRepositoryMock =
            new StarWarsRepository_1.StarWarsRepository();
        controller = new FusionadosController_1.FusionadosController(starWarsRepositoryMock, omdbRepositoryMock, fusionRepositoryMock);
    });
    it("debería retornar los datos fusionados correctamente", async () => {
        fusionRepositoryMock.findFusion.mockResolvedValue(null);
        starWarsRepositoryMock.findPeople.mockResolvedValue(findPeopleMock_1.findPeopleMock);
        starWarsRepositoryMock.findFilm.mockResolvedValue(findFilmMock_1.findFilmMock);
        omdbRepositoryMock.find.mockResolvedValue(findMovieMock_1.findMovieMock);
        fusionRepositoryMock.create.mockResolvedValue(true);
        const result = await controller.handle({});
        expect(result.character_name).toEqual(fusionMock_1.fusionMock.character_name);
        expect(fusionRepositoryMock.create).toHaveBeenCalledTimes(1);
        expect(starWarsRepositoryMock.findPeople).toHaveBeenCalledTimes(1);
        expect(omdbRepositoryMock.find).toHaveBeenCalledTimes(1);
    });
});
