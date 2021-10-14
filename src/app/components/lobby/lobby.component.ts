import { Component, OnInit } from "@angular/core";
import { ChatService } from "src/app/services/chat.service";
import {FormControl} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.css"],
})
export class LobbyComponent implements OnInit {

  public name = new FormControl('');
  public isConnected:boolean = false;
  public hasEnoughPlayers:boolean = false;
  public playerList:string[] = [];
  public nameSent:boolean = false;

  constructor(
    private chatService: ChatService,
    private router: Router
    ) {}

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
      if(this.playerList.length == 4){
        this.router.navigate(['gameboard'],{state: {playerList:this.playerList, yourName:this.name.value}});
      }
    })
  }

  public launchGame(){
    if(this.name.value != ""){
      this.chatService.sendNameToPlayers(this.name.value);
      this.nameSent = true;
    }
  }

  public connect(): void {
    this.chatService.start();
  }
}
