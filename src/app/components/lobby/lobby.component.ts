import { Component, OnInit } from "@angular/core";
import { ChatService } from "src/app/services/chat.service";

@Component({
  selector: "app-lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.css"],
})
export class LobbyComponent implements OnInit {
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {}

  public connect(): void {
    this.chatService.start();
  }
}
