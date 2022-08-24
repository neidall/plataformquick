import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private firestore: AngularFirestore) { }

  addTarea(tarea:any):Promise<any>{
    return this.firestore.collection('tareas').add(tarea);
  }
}
