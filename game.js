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
var pacman = null ;
var myContext = null ;
var aliens = null ;
var spritesheet = null;
var assetLoaded = false ;
var spriteMapIndex = new Map();
var aliens = [];
var dx = [-1,0,0,1];
var dy = [0,-1,1,0];
var hashDirection = ["Up","Left","Right","Down"];

function Character(x, y, direction, animation = 0)
{
	this.x = x;
	this.y = y;
	this.direction = direction;
	this.animation = animation;
}



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
function initGame() 
{
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
 	pacman = new Character(1,9,UP);
 	for(var i = 0 ; i < 4 ; i++)
 	{
 		aliens.push(new Character(7+i,10,UP));
 	}
}

function populateMap()
{
	var pD = [[scalex*0+3,scaley*3],[scalex*1,scaley*3]];
	var pL = [[scalex*0+3,scaley*0],[scalex*1,scaley*0]];
	var pR = [[scalex*0+3,scaley*1],[scalex*1,scaley*1]];
	var pU = [[scalex*0+3,scaley*2],[scalex*1,scaley*2]];
	spriteMapIndex.set("pacmanUp",pU);
	spriteMapIndex.set("pacmanLeft",pL);
	spriteMapIndex.set("pacmanRight",pR);
	spriteMapIndex.set("pacmanDown",pD);
	spriteMapIndex.set("alienUp",new Array([scalex*0+3,scaley*4],[scalex*1,scaley*4]));
	spriteMapIndex.set("alienDown",new Array([scalex*0+3,scaley*4],[scalex*1,scaley*4]));
	spriteMapIndex.set("alienLeft",new Array([scalex*0+3,scaley*4],[scalex*1,scaley*4]));
	spriteMapIndex.set("alienRight",new Array([scalex*0+3,scaley*4],[scalex*1,scaley*4]));

}



/// will auto run when image get's loaded
onImageLoad = function ()
{
	console.log("Image Loaded");
	assetLoaded = true ;
	console.log("complete "+ spritesheet.complete);
	renderAll();
	//context.drawImage(this,x,y);
}


function setField()
{
	// draw here the objects from spritesheet
	drawSprite("pacmanLeft",pacman.x,pacman.y);
	drawSprite("alienUp",(pacman.x),(pacman.y+1));
}

/// take place in array
function renderAll()
{
	myContext.clearRect(pacman.x, pacman.y, scalex, scaley);
	drawRect(pacman.x * scalex , pacman.y * scaley, grid[pacman.x] * scalex , grid[pacman.y] * scaley , 'black');
	for(var i = 0 ; i < 4 ; i++)
	{
		myContext.clearRect(aliens[i].x * scalex, aliens[i].y * scaley , scalex , scaley);
		drawRect(aliens[i].x*scalex, aliens[i].y*scaley, 
		grid[aliens[i].x][aliens[i].y]*scalex,
		grid[aliens[i].x][aliens[i].y]*scaley, 'black');
	}
	drawSprite("pacman"+hashDirection[pacman.direction], pacman.x, pacman.y, pacman.animation);
	for(var i = 0 ; i < 4 ; i++)
	{
		drawSprite("alien"+hashDirection[aliens[i].direction], aliens[i].x , aliens[i].y , aliens[i].animation);
	}

}

function drawSprite(spritename , coordinateX , coordinateY,animator = 0)
{
	/// for canvas place coordinateX * scalex & coordinateY * scaleY
	var spr;
	if(spriteMapIndex.get(spritename) != undefined)
	{
		spr = spriteMapIndex.get(spritename);
		myContext.drawImage(spritesheet, spr[animator][0], spr[animator][1], scalex
			, scaley, coordinateX * scalex,coordinateY * scaley, scalex, scaley);
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