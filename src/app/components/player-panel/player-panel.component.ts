import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { player } from 'src/app/classes/player';
import * as internal from 'stream';

@Component({
  selector: 'app-player-panel',
  templateUrl: './player-panel.component.html',
  styleUrls: ['./player-panel.component.css']
})
export class PlayerPanelComponent implements OnInit {

  constructor() { }

  @Input() name:string;
  @Input() num:number;
  @Input() order:number[];
  @Input() yourNum:number;
  @Input() isYourTurn:boolean;
  @Input() yourInfos:player;

  @Output() passTurnChild = new EventEmitter<string>();

  passTurn(): void {
    this.passTurnChild.next();
  }

  ngOnInit(): void {
  }

}
