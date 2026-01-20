export interface Lugar {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  direccion: string;
  horario: string;
  sitio_web: string;
  latitud: number;
  longitud: number;
  imagen_url?: string;
}
