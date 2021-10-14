import { Component, Input, OnInit } from '@angular/core'; 
import { Location } from '@angular/common';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  public playerList:string[] = [];
  public name:string = "";
  public isYourTurn:boolean = false;

  constructor(private location:Location,private chatService:ChatService) { }

  ngOnInit(): void {
    this.playerList = this.location.getState()["playerList"];
    this.name = this.location.getState()["yourName"];
    if(this.name == this.playerList[0]){
      this.isYourTurn = true;
    }
    console.log(this.playerList);

    this.chatService.retrievePlayerNameTurn().subscribe((playerName : string) => {
      if (playerName == this.name){
        this.isYourTurn = true;
      }
    })
  }

  public passToNextPlayer(){
    this.isYourTurn = false;
    this.chatService.passTurn();
  }

}
