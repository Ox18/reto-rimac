import { Fusionados } from "../../domain/models/Fusionados";
import { Movie } from "../../infra/thirdparty/omdb/omdb.interface";
import { People } from "../../infra/thirdparty/swapi/swapi.interface";
import { formatDateToISO } from "../../shared/helpers/date.helper";

export const fusionadosAdapter = (
  id: number,
  people: People,
  movie: Movie
): Fusionados => {
  return {
    id,
    nombre: people.name,
    altura: Number(people.height),
    peso: Number(people.mass),
    genero: people.gender === "male" ? "Hombre" : "Mujer",
    pelicula: {
      titulo: movie.Title,
      lanzamiento: formatDateToISO(movie.Released),
      actores: movie.Actors.split(", "),
      trama: movie.Plot,
    },
    fecha_creacion: new Date(movie.Released),
  };
};
