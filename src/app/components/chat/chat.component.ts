import { Component, Input, OnInit} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  text = "";
  opcion:boolean =true;
 


  constructor(public chat:ChatService , private user : ProyectosService) {  {
 
  }}
  
  ngOnInit(): void {
    


  }




 //firebase
  // async enviar(){
  //   const res = await this.user.getAll('usuarios').catch(error =>{
  //     console.log(error);
  //     })
  //  console.log(res);
   

  //     if (res) {
  //       const mensaje = this.text;
  //     }
    
   
  // }

 

  sendMessage(){

      let messageInfo = {
      text : this.text,
      messageType:1
    };
    this.chat.sendMessage(messageInfo);
    this.text="";
  }

  
}

