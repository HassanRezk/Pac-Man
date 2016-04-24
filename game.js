/// global variables
var x = 0;
var y = 0;
var width = 20;
var height = 20;
var scalex = 22 ;
var scaley = 21;
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
var spriteMapIndex = new Map();


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
	myCanvas.width = width*scalex ;
	myCanvas.height = height*scaley;
	myContext = myCanvas.getContext('2d');
	drawMaze();
 	spritesheet = new Image();
 	spritesheet.onload = onImageLoad ;
 	spritesheet.src = "sprite.png";
 	console.log("assetLoaded "+assetLoaded);
 	populateMap();
 	pacmanX = 9 ;
 	pacmanY = 1 ;
 	pacmanDirection = DOWN ;
 	startGame();
}

function populateMap()
{
	var pD = [[scalex*0+3,scaley*3],[scalex*1,scaley*3]];
	spriteMapIndex.set("pacmanUp",pD);
	spriteMapIndex.set("pacmanLeft",1);
	spriteMapIndex.set("pacmanRight",2);
	spriteMapIndex.set("pacmanDown",pD);
	spriteMapIndex.set("Alien0",4);
	spriteMapIndex.set("Alien1",5);
	spriteMapIndex.set("Alien2",6);
	spriteMapIndex.set("Alien3",7);

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
	drawSprite("pacmanDown",pacmanX*scalex,pacmanY*scaley);
}

function drawSprite(spritename , coordinateX , coordinateY)
{
	var spr ;
	if( spriteMapIndex.get(spritename) != undefined)
	{
		spr = spriteMapIndex.get(spritename);
		myContext.drawImage(spritesheet,spr[0][0],spr[0][1],scalex
			,scaley,coordinateX,coordinateY,scalex,scaley);
	}
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
				drawRect(i*scalex, j*scaley, grid[i][j]*scalex, grid[i][j]*scaley, 'black');
			}
}