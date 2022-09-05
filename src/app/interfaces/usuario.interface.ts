export interface UsuarioI {
    uid: any;
    email: string;
    password: string;
    nombre: string;
    foto: any ;
    estado: boolean;
    cargo: 'usuario' | 'admin',
  }

  export interface ProyectoI {
    id: string;
    nombre: string;
    fecha: string;
    responsable: string;
    integrantes: string [];
    tareas: string[];
    objetivo : any;
  }

  export interface UsuarioDataI {
    id:string
    foto : string;
    nombre: string;
    estado: string;
  }
