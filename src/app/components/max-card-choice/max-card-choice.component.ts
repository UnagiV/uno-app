import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { maxcardinfo } from 'src/app/classes/maxcardinfo';

@Component({
  selector: 'app-max-card-choice',
  templateUrl: './max-card-choice.component.html',
  styleUrls: ['./max-card-choice.component.css',"../../app.component.scss"]
})

export class MaxCardChoiceComponent implements OnInit {

  @Input() maxCardInfo:maxcardinfo;

  @Output() sendChoiceChild = new EventEmitter<{color:string,choice:number}>();

  sendChoice(color:string,choice:number): void {
    this.sendChoiceChild.emit({color,choice});
    console.log(color,choice);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
