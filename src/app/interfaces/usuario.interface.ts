export interface UsuarioI {
    usuario: string;
    password: string;
  }

  export interface ProyectoI {
    id: string;
    nombre: string;
    fecha: string;
    responsable: string;
    integrantes: string [];
    tareas: string[];
    objetivo:any;
  }