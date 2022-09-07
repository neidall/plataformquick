import { Injectable } from '@angular/core';
import { AngularFirestore , CollectionReference, docChanges ,Query} from '@angular/fire/compat/firestore';
import { UsuarioI } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private firestore: AngularFirestore) { 
    
  }

  // addProyecto(proyecto:any):Promise<any>{
  //   return this.firestore.collection('items').add(proyecto);
  // }


  //servicio para guardar usuarios en la base de datos
  createDoc(data:any, path:string , id:string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data)
  }

  //servicio para obtener usuario
  getDoc<UsuarioI>(path:string , id:string){
   return this.firestore.collection(path).doc<UsuarioI>(id).valueChanges();
  }





  async create(collection: string , dato: any  ) {
    try {
      return await this.firestore.collection(collection).add(dato);
      
      
    } catch (error) {
      console.log("error en: create ", error);
      return ;
    }
        
  }

  async getAll(collection:string) {
    try {
      return await this.firestore.collection(collection).snapshotChanges();

    } catch (error) {
      console.log("error en: getAll ", error)
      return;
    }
  }


   async getById(collection:string, id: string | undefined) {
     try {
       return await this.firestore.collection(collection).doc(id).get();
     } catch (error) {
       console.log("error en: getById ", error);
       return ;
     }
   }


  async delete(collection: string, id: string | undefined) {
    try {
      return await this.firestore.collection(collection).doc(id).delete();
    } catch (error) {
      console.log("error en: getAll ", error)
    }
  }


  async update(collection: string, id: string | undefined, dato: unknown) {
    try {
      return await this.firestore.collection(collection).doc(id).set(dato);
    } catch (error) {
      console.log("error en: getAll ", error)
    }
  }

}
