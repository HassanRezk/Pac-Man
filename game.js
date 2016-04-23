var x = 0;
var y = 0;
var width = 20;
var height = 20;
function startGame() {
   	gameArea.start();
}

var gameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
	        this.context = this.canvas.getContext("2d");
	        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
	        this.interval = setInterval(updateGameArea, 20);
	        drawRect(x, y, width, height);
        }
}

function updateGameArea() {
	cx = gameArea.context;
	cx.clearRect(0, 0, 750, 500);
	++x;
	++y;
	drawRect(x, y, width, height);

}

function drawRect(x, y, width, height) {
	cx = gameArea.context;
	cx.color = 'red';
	cx.fillRect(x, y, width, height);
}
