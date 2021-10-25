import { Component, Input, OnInit } from '@angular/core'; 
import { Location } from '@angular/common';
import { ChatService } from 'src/app/services/chat.service';
import { maxcardinfo } from 'src/app/classes/maxcardinfo';
import { player } from 'src/app/classes/player';

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
  public maxCardInfo:maxcardinfo;
  public yourInfos:player;

  constructor(private location:Location,private chatService:ChatService) { }

  ngOnInit(): void {
    this.yourInfos = new player();
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

    this.chatService.retrieveChooseCardMax().subscribe((maxCardInfo : maxcardinfo) => {
      this.maxCardInfo = maxCardInfo;
    });

    if(this.yourNum == 1){
      this.chatService.createGame();
    }
  }

  public passToNextPlayer(){
    this.isYourTurn = false;
    this.chatService.passTurn();
  }

  public sendMaxColor(params:object){
    console.log(params)
    //Ajouter l'appel de la fonction
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
