/// global variables
var x = 0;
var y = 0;
var width = 20;
var height = 20;
var scalex = 15 ;
var scaley = 8 ;
var UP = 0 ;
var DOWN = 3 ;
var RIGHT = 2 ;
var LEFT = 1 ;
var myCanvas = null ;
var myContext = null ;
var pacman = null ;
var pacmanX = 0 ;
var pacmanY = 0 ;
var pacmanDirection ;
var aliens = null ;
var spritesheet = null;
var assetLoaded = false ;


var grid = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		    [0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0],
		    [0,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1,0],
		    [0,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1,0],
		    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		    [0,1,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,1,0],
		    [0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,0],
		    [0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0],
		    [0,0,0,0,1,0,1,1,1,3,1,1,1,0,1,0,0,0,0],
		    [1,1,1,1,1,1,1,1,3,3,3,1,1,1,1,1,1,1,1],
		    [0,0,0,0,1,0,1,1,1,3,1,1,1,0,1,0,0,0,0],
		    [0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0],
		    [0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0],
		    [0,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1,0],
		    [0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0],
		    [0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0],
		    [0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,0],
		    [0,1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0],
		    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0]];

/// body on load function
function initGame() {
	/// draw maze ;
	myCanvas = document.getElementById('myCanvas');
	myContext = myCanvas.getContext('2d');
	drawMaze();
 	spritesheet = new Image();
 	spritesheet.onload = onImageLoad ;
 	spritesheet.src = "sprite.png";
 	console.log("assetLoaded "+assetLoaded);
 	pacmanX = 1 ;
 	pacmanY = 8 ;
 	pacmanDirection = DOWN ;
 	startGame();
}

function startGame()
{
	/// the real game is here
	/// make interval as they run in it  
}


/// will auto run when image get's loaded
onImageLoad = function ()
{
	console.log("Image Loaded");
	assetLoaded = true ;
	console.log("complete "+ spritesheet.complete);
	setField();
	//context.drawImage(this,x,y);
}

function updateGameArea() {
	cx = gameArea.context;
	cx.clearRect(0, 0, 750, 500);
	++x;
	++y;
	drawRect(x, y, width, height);
}

function setField()
{
	// draw here the objects from spritesheet
}

function drawRect(x, y, width, height, style) {
    myContext.beginPath();
    myContext.rect(x, y, width, height);
    myContext.closePath();
    myContext.fillStyle = style;
    myContext.fill();
}

function drawMaze() {
	for(var i = 0 ; i < grid.length ; ++i)
		for(var j = 0 ; j < grid[i].length ; ++j)
			if(grid[i][j] == 1) {
				console.log('here');
				drawRect(i*scalex, j*scaley, grid[i][j]*scalex, grid[i][j]*scaley, 'blue');
			}
}