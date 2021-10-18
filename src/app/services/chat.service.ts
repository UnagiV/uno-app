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

  private sharedConnectedState = new Subject<boolean>();
  private sharedHasEnoughPlayers = new Subject<boolean>();
  private sharedPlayerName = new Subject<string>();
  private sharedPlayerNameTurn = new Subject<string>();

  constructor(private http: HttpClient) {
    this.connection.onclose(async () => {
      await this.start();
    });
    this.connection.on("ConnectedState", (isConnected) => {
      this.receiveConnectedState(isConnected);
    });
    this.connection.on("HasEnoughPlayers", (hasEnoughPlayers) => {
      this.receiveHasEnoughPlayers(hasEnoughPlayers);
    });
    this.connection.on("PlayerName", (playerName) => {
      this.receivePlayerName(playerName);
    });
    this.connection.on("PlayerNameTurn", (playerName) => {
      this.receivePlayerNameTurn(playerName);
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

  
  public sendNameToPlayers(name: string){
    this.connection.invoke("SendName", name).catch((err) => console.error(err));
  }

  public passTurn(){

    this.connection.invoke("PassTurn").catch((err) => console.error(err));
  }

  // Receives

  private receiveConnectedState(isConnected : boolean):void{
    this.sharedConnectedState.next(isConnected);
  }

  private receiveHasEnoughPlayers(hasEnoughPlayers:boolean):void{
    this.sharedHasEnoughPlayers.next(hasEnoughPlayers);
  }

  private receivePlayerName(playerName:string):void{
    this.sharedPlayerName.next(playerName);
  }
  
  private receivePlayerNameTurn(playerName:string):void{
    this.sharedPlayerNameTurn.next(playerName);
  }

  // Retrieves 

  public retrieveConnectedState(): Observable<boolean> {
    return this.sharedConnectedState.asObservable();
  }

  public retrieveHasEnoughPlayers(): Observable<boolean> {
    return this.sharedHasEnoughPlayers.asObservable();
  }

  public retrievePlayerName(): Observable<string> {
    return this.sharedPlayerName.asObservable();
  }

  public retrievePlayerNameTurn(): Observable<string> {
    return this.sharedPlayerNameTurn.asObservable();
  }
}
