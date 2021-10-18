import { card } from "./card";

export class player {
    public redLimit:number;
    public blueLimit:number;
    public greenLimit:number;
    public yellowLimit:number;
    public hand:card[];

    constructor(){
        this.hand = [];
    }
}