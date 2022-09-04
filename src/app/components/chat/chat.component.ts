import { Component, Input, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  text = "";
  opcion:boolean =true;
  @Input() childMessage!: string;
//  nuevoMensaje:string = "";
//  usuarioLogeado:any;
//  mensajes: any = [
//   {
//     emisor:"id",
//     texto: "hola"
//   },
//   {
//     emisor:"id",
//     texto: "como estas"
//   },
//  ];
  constructor(public chat:ChatService) { }
  
  ngOnInit(): void {
    // this.authService.getUserLogget().subscribe(usuario => this.usuarioLogeado = usuario)
  }

  sendMessage(){
    // console.log(this.nuevoMensaje);
    // this.nuevoMensaje = "";
    
    let messageInfo = {
      text : this.text,
      messageType:1
    };
    this.chat.sendMessage(messageInfo);
    this.text="";
  }

  
}

