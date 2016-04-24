function updateGame() {
	clearAliens();
	changeAliensLocation();
	renderAll();
	console.log("updated");
}

function changeAliensLocation() {
	for(var i = 0 ; i < 4 ; ++i) {
		var newx = (aliens[i].x + dx[aliens[i].direction])%width;
		var newy = (aliens[i].y + dy[aliens[i].direction])%height;
		if(isWall(newx, newy) && isAlien(newx, newy, i)) {
			aliens[i].x = newx;
			aliens[i].y = newy;
			++aliens[i].animation;
			aliens[i].animation %= 2;
		}
	}
}

function changeAlienDirection(i) {
	var start = Math.floor((Math.random()*50))%4;
	for(var j = start ; j < 4 ; ++j) {
		var newx = (aliens[i].x + dx[j])%width;
		var newy = (aliens[i].y + dy[j])%height;
	}
}

function clearAliens() {
	for(var i = 0 ; i < 4 ; ++i) {
		clearSprite(aliens[i].x, aliens[i].y);
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

function isAnotherObject(coordinateX, coordinateY) {

}