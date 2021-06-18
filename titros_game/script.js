const canvas = document.querySelector("#canv");

var ctx = canvas.getContext("2d");

// draw function
function Draw(r,c,color){
    this.r = r;
    this.c = c;
    this.color = color;
    this.size = 20;
    this.draw_rect();
}

Draw.prototype = {
    draw_rect : function(){
        ctx.fillStyle = this.color;
        var size = this.size;
        ctx.fillRect(size*this.r,size*this.c,size,size);
    }
}
// draw function




function Piece(pattern,color){
    this.pattern = pattern
    this.color = color
    this.x = 5
    this.y = 3
    this.tetrominoN = 0;
    this.activeTetromino = this.pattern[this.tetrominoN];
    this.VACANT = "white";
}

Piece.prototype =  {
    rotate:function(){
        this.unDrawPattern();
        this.tetrominoN = [this.tetrominoN+1] % this.pattern.length;
        if(!this.collision(this.x,this.y ,this.pattern[this.tetrominoN])){
            this.activeTetromino = this.pattern[this.tetrominoN];
        }else{
            this.x = this.x - 1
        }
        
    },
    collision : function(x,y,piece){
        for(r=0;r<piece.length;r++){
            for(c=0;c<piece[r].length;c++){
                cwidth = canvas.clientWidth;
                cheight = canvas.clientHeight;
                
                if(!piece[r][c]) continue;
                
                if( (r+y) * 20 >= cheight || (c+x) * 20 >= cwidth || (c+x) * 20 < 0 ){
                    console.log((c+x) * 20)
                    return true;
                }
            }
        }

        return false;
    },
    moveDown : function(){
        if(!this.collision(this.x,this.y+1,this.activeTetromino)){
            let org_color = this.color;
            this.color = "white";
            this.drawPattern()
            this.y++;
            this.color = org_color;
            this.drawPattern()    
        }
        else
        {
            
        }
    },
    moveUp : function(){
        let org_color = this.color;
        this.color = "white";
        this.drawPattern()
        this.y--;
        this.color = org_color;
        this.drawPattern()
    },
    moveLeft : function(){
        if(!this.collision(this.x - 1,this.y ,this.activeTetromino)){
            let org_color = this.color;
            this.color = "white";
            this.drawPattern()
            this.x--;
            this.color = org_color;
            this.drawPattern()
        }else{
            
        }

    },
    moveRight : function(){
        if(!this.collision(this.x + 1,this.y ,this.activeTetromino)){
            let org_color = this.color;
            this.color = "white";
            this.drawPattern()
            this.x++;
            this.color = org_color;
            this.drawPattern()
        }
    },
    drawPattern() {
        let pattern = this.activeTetromino
        
        for(let r = 0 ; r<pattern.length;r++){
            for(let c=0;c<pattern[r].length;c++){
                if(this.activeTetromino[r][c]){
                    var x = this.x + c;
                    var y = this.y + r;
                    new Draw(x,y,this.color);
                    
                }
            }
        }
    },
    unDrawPattern() {
        let pattern = this.activeTetromino
        
        for(let r = 0 ; r<pattern.length;r++){
            for(let c=0;c<pattern[r].length;c++){
                if(this.activeTetromino[r][c]){
                    var x = this.x + c;
                    var y = this.y + r;
                    new Draw(x,y,this.VACANT);
                    
                }
            }
        }
    }
}


var piece = new Piece(J,"blue");

piece.drawPattern();


window.addEventListener("click",function(){
    piece.rotate();
    piece.drawPattern();
})
window.addEventListener("keydown",function(e){

    if(e.keyCode == 37) {
        piece.moveLeft();
    }
    if(e.keyCode == 38) {
        piece.moveUp();
    }
    if(e.keyCode == 39) {
        piece.moveRight();
    }
    if(e.keyCode == 40) {
        piece.moveDown();
    }
})