import { card } from "./card";
import { color } from "./color";

export class deck{
    public color:color;
    public cardList:card[];

    constructor(){
        this.cardList = [];
    }
}