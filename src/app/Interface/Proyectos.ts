export interface ImagenProyecto {
  id?: number;
  url: string;
}

export interface Proyectos {
  id?: number;
  titulo?: string;
  imagenPrincipal:string,
  imagenPrincipalMobile:string,
  listaImg?: ImagenProyecto[];
}