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
  public yourNum:number;
  public order:number[];

  constructor(private location:Location,private chatService:ChatService) { }

  ngOnInit(): void {
    this.playerList = this.location.getState()["playerList"];
    this.name = this.location.getState()["yourName"];
    this.yourNum = this.playerList.indexOf(this.name)+1;
    if(this.name == this.playerList[0]){
      this.isYourTurn = true;
    }
    this.order = this.calculateOrder(this.yourNum);
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


  public calculateOrder(num):number[]{
    if(num == 1)
    {
      return [1,2,3,4];
    }
    else if(num == 2){
      return [2,3,4,1];
    }
    else if(num == 3){
      return [3,4,1,2];
    }
    else{
      return [4,1,2,3];
    }
  }
}
