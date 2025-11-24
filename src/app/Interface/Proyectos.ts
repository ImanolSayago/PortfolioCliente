export interface ImagenProyecto {
  id?: number;
  url: string;
}

export interface Proyectos {
  id?: number;
  titulo?: string;
  descripcion?: string;
  imagenPrincipal:string,
  listaImg?: ImagenProyecto[];
}