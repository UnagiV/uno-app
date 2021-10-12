import { Injectable, OnInit } from "@angular/core";
import * as signalR from "@microsoft/signalr"; // import signalR
import { HttpClient } from "@angular/common/http";
import { MessageDto } from "../Dto/MessageDto";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  private connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl("https://localhost:5001/chatsocket", {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
    })
    .build();
  // readonly POST_URL = "http://localhost:5000/api/chat/send";

  private sharedObj = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.connection.onclose(async () => {
      await this.start();
    });
    this.connection.on("ConnectedState", (isConnected) => {
      console.log(isConnected);
      this.receiveConnectedState(isConnected);
    });
  }

  // Strart the connection
  public async start() {
    try {
      await this.connection.start();
      console.log("connected");
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    }
  }

  private receiveConnectedState(isConnected : boolean):void{
    this.sharedObj.next(isConnected);
  }

  /* ****************************** Public Mehods **************************************** */

  // // Calls the controller method
  // public broadcastMessage(msgDto: any) {
  //   // this.http
  //   //   .post(this.POST_URL, msgDto)
  //   //   .subscribe((data) => console.log(data));
  //   this.connection
  //     .invoke("SendMessage1", msgDto.user, msgDto.msgText)
  //     .catch((err) => console.error(err)); // This can invoke the server method named as "SendMethod1" directly.
  // }

  public retrieveConnectedState(): Observable<boolean> {
    return this.sharedObj.asObservable();
  }
}
