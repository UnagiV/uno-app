import { Component, Input, OnInit } from '@angular/core'; 
import { Location } from '@angular/common';
import { ChatService } from 'src/app/services/chat.service';
import { maxcardinfo } from 'src/app/classes/maxcardinfo';
import { player } from 'src/app/classes/player';
import { deck } from 'src/app/classes/deck';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  public playerList:{name:string,playerInfos:player}[] = [];
  public name:string = "";
  public isYourTurn:boolean = false;
  public yourNum:number;
  public order:number[];
  public maxCardInfo:maxcardinfo; 
  

  constructor(private location:Location,private chatService:ChatService) { }

  ngOnInit(): void {
    let tempNames:string[] = this.location.getState()["playerList"];

    for(let plName of tempNames){
      let plInfos:player = new player();
      this.playerList.push({name:plName,playerInfos:plInfos});
    }

    this.name = this.location.getState()["yourName"];
    this.yourNum = this.playerList.map(p => p.name).indexOf(this.name)+1;
    if(this.playerList[this.yourNum-1].name == this.playerList[0].name){
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

    this.chatService.retrieveSendColorsToAll().subscribe(({name,color,value}) => {
      if(this.name != name){
        let playerToChange = this.playerList.find(obj => {
          return obj.name === name
        })
        let num = this.playerList.indexOf(playerToChange);
        if(color == "blue"){
          this.playerList[num].playerInfos.blueLimit = value;
        }else if(color == "red"){
          this.playerList[num].playerInfos.redLimit = value;
        }else if(color == "green"){
          this.playerList[num].playerInfos.greenLimit = value;
        }else{
          this.playerList[num].playerInfos.yellowLimit = value;
        }
      }
    });

    this.chatService.retrieveSendCardsToAll().subscribe(({names,cards}) => {
      for(let i = 0; i < 3; i++){
        console.log(cards[i]);
        this.playerList[i].playerInfos.hand.cardList = cards[i];
        
      }
      
    });

    if(this.yourNum == 1){
      this.chatService.createGame();
    }
  }

  public getMyInfos(num:number):player{
    return this.playerList[num].playerInfos;
  }

  public passToNextPlayer(){
    this.isYourTurn = false;
    this.chatService.passTurn();
  }

  public sendMaxColor(params:any){
    console.log(params)
    this.maxCardInfo = null;
    this.chatService.sendMaxColorInfos(params);
    if(params.color == "blue"){
      this.playerList[this.yourNum-1].playerInfos.blueLimit = params.choice;
    }else if(params.color == "red"){
      this.playerList[this.yourNum-1].playerInfos.redLimit = params.choice;
    }else if(params.color == "green"){
      this.playerList[this.yourNum-1].playerInfos.greenLimit = params.choice;
    }else{
      this.playerList[this.yourNum-1].playerInfos.yellowLimit = params.choice;
    }
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
