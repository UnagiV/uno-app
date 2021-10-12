import { Component, OnInit } from "@angular/core";
import { ChatService } from "src/app/services/chat.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: "app-lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.css"],
})
export class LobbyComponent implements OnInit {
  name = new FormControl('');
  public isConnected:boolean = false;
  public hasEnoughPlayers:boolean = false;
  public playerList:string[] = [];
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.retrieveConnectedState().subscribe((isConnected : boolean) => {
      this.isConnected = isConnected;
    })
    this.chatService.retrieveHasEnoughPlayers().subscribe((hasEnoughPlayers : boolean) => {
      this.hasEnoughPlayers = hasEnoughPlayers;
    })
    this.chatService.retrievePlayerName().subscribe((playerName : string) => {
      this.playerList.push(playerName);
      console.log(this.playerList);
    })
  }

  public launchGame(){
    this.chatService.sendNameToPlayers(this.name.value);
  }

  public connect(): void {
    this.chatService.start();
  }
}
