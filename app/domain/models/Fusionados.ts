export interface Fusionados {
  id: number;
  nombre: string;
  altura: number;
  peso: number;
  genero: string;
  pelicula: {
    titulo: string;
    lanzamiento: string;
    actores: string[];
    trama: string;
  };
  fecha_creacion: Date;
}
