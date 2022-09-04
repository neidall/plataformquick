import { Injectable } from '@angular/core';
import { SockedService } from './socked.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
 
  chats:any [] = []; 
  constructor(private socket:SockedService) {
    this.onReciveMessage();
   }

     sendMessage(messageInfo: { text: string; messageType: number; }){
     this.chats.push(messageInfo);
     this.socket.io.emit("sendMessage", messageInfo);
    }

    onReciveMessage(){
      this.socket.io.on("reciveMessage",(messageInfo)=>{
        messageInfo.messageType = 2;
        this.chats.push(messageInfo)
        alert("nuevo mensaje")
      })
    } 

}