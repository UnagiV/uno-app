enum color{
    yellow,
    red,
    blue,
    green,
    neutral
}

export class card {
    public color:color;
    public num:number;
    public description:string;
    public possiblePlay:card;

    constructor(color:color,description:string,possiblePlay:card,num?:number){
        this.color = color;
        this.description = description;
        this.possiblePlay = possiblePlay;
        this.num = num || 0;
    }
}