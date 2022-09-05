import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SockedService {
  io = io("http://localhost:3000/",{
    withCredentials:true,
    autoConnect:true
  })
  constructor() {

    
    // this.io.emit("test");

    // this.io.on("test2",()=>{
    //   alert("Test2")
      
    // })
  }
}
