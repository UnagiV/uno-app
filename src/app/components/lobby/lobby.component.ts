import { Component, OnInit } from "@angular/core";
import { ChatService } from "src/app/services/chat.service";

@Component({
  selector: "app-lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.css"],
})
export class LobbyComponent implements OnInit {
  public isConnected:boolean;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.retrieveConnectedState().subscribe((isConnected : boolean) => {
      this.isConnected = isConnected;
    })
  }

  public connect(): void {
    this.chatService.start();
  }
}
