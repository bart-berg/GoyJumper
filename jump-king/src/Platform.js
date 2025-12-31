export class Platform{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx){
        ctx.fillStyle = "grey";
        ctx.fillRect(this.x,this.y, this.width, this.height);
    }
}