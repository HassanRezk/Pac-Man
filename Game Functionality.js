function keyDown(event) {
	if(event.keyCode == 38)
		pacman.direction = UP;
	else if(event.keyCode == 37)
		pacman.direction = LEFT;
	else if(event.keyCode == 39)
		pacman.direction = RIGHT;
	else if(event.keyCode == 40)
		pacman.direction = DOWN;
}

function updateGame() {
	clearAliens();
	clearPacman();
	changePacmanLocation();
	changeAliensLocation();
	isGameOver();
	renderAll();
	console.log("updated");
}

function clearPacman() {
	clearSprite(pacman.x, pacman.y, true);
	if(grid2[pacman.x][pacman.y] == 0) {
		++scorecnt;
	}
	grid2[pacman.x][pacman.y] = 1;
	score = document.getElementById('score');
	score.innerHTML = "Score: " + scorecnt;
}

function changeAliensLocation() {
	for(var i = 0 ; i < 4 ; ++i) {
		if(!validMove(i))
			changeAlienDirection(i);
		var newx = (aliens[i].x + dx[aliens[i].direction])%width;
		var newy = (aliens[i].y + dy[aliens[i].direction])%height;
		aliens[i].x = newx;
		aliens[i].y = newy;
		++aliens[i].animation;
		aliens[i].animation %= 2;
	}
}

function changePacmanLocation() {
	var newx = (pacman.x + dx[pacman.direction])%width;
	var newy = (pacman.y + dy[pacman.direction])%height;
	if(isWall(newx, newy)) {
		pacman.x = newx;
		pacman.y = newy;
		++pacman.animation;
		pacman.animation %= 2;
	}
}

function validMove(i) {
	var newx = ((aliens[i].x + dx[aliens[i].direction])%width);
	var newy = ((aliens[i].y + dy[aliens[i].direction])%height);
	console.log(newx + " " + newy);
	return isWall(newx, newy) && !isAlien(newx, newy, i);
}


function changeAlienDirection(i) {
	var start = Math.floor((Math.random()*50))%4;
	for(var j = start, k = 0 ; k < 4 ; j = (j+1)%4, ++k) {
		var newx = (aliens[i].x + dx[j])%width;
		var newy = (aliens[i].y + dy[j])%height;
		if(isWall(newx, newy) && !isAlien(newx, newy, i)) {
			aliens[i].direction = j;
		}
	}
}

function clearAliens() {
	for(var i = 0 ; i < 4 ; ++i) {
		var eat;
		if(grid2[aliens[i].x][aliens[i].y] == 1)
			clearSprite(aliens[i].x, aliens[i].y, true);
		else clearSprite(aliens[i].x, aliens[i].y, false);
	}
}

function isWall(coordinateX, coordinateY) {
	return grid[coordinateX][coordinateY] == 1;
}

function isAlien(coordinateX, coordinateY, j) {
	for(var i = 0 ; i < 4 ; ++i)
		if(i != j && (coordinateX == aliens[i].x && coordinateY == aliens[i].y))
			return true;
	return false;
}

function isGameOver() {
	for(var i = 0 ; i < 4 ; ++i)
		if(aliens[i].x == pacman.x && aliens[i].y == pacman.y)
		{
			document.getElementById("score_t").value = scorecnt;
			document.getElementById("myForm").submit();
		}
}