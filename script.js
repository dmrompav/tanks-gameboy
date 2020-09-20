// *Elements ======================================
//Map
var row = document.querySelectorAll('.row'),
	a = [],
	map = [];
for (i = 0; i < row.length; i++) {
	a[i] = row[i].querySelectorAll('.col');
	map[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}
var tank = {
	x: 4,
	y: 9,
	nav: 9,  //12-3-6-9
	speed: 0,
	up: true,
	right: true,
	down: true,
	left: true,
	bomb: {
		
	}
};

//*Process ===========================================
TankDraw(tank);
document.addEventListener('keydown', KeyMove);
document.addEventListener('keyup', KeyStop);
setInterval(MapDraw, 100);
setInterval(Move, 100);

//*Functions ========================================
function MapDraw() {
	for (i = 0; i < 20; i++) {
		for (j = 0; j < 10; j++) {
			map[i][j] = 0;
			TankDraw(tank);
			if (map[i][j] == 0) {
				a[i][j].style.backgroundColor = "#777777"
			}
			else {
				a[i][j].style.backgroundColor = "#000000"
			}
		}
	}
}
function TankDraw(tank) {
	map[tank.y][tank.x] = 1;
	map[tank.y - 1][tank.x] = 1;
	map[tank.y + 1][tank.x] = 1;
	map[tank.y][tank.x - 1] = 1;
	map[tank.y][tank.x + 1] = 1;
	if (tank.nav == 12) {
		map[tank.y - 1][tank.x - 1] = 0;
		map[tank.y - 1][tank.x + 1] = 0;
		map[tank.y + 1][tank.x + 1] = 1;
		map[tank.y + 1][tank.x - 1] = 1;
	}
	else if (tank.nav == 3) {
		map[tank.y - 1][tank.x - 1] = 1;
		map[tank.y - 1][tank.x + 1] = 0;
		map[tank.y + 1][tank.x + 1] = 0;
		map[tank.y + 1][tank.x - 1] = 1;
	}
	else if (tank.nav == 6) {
		map[tank.y - 1][tank.x - 1] = 1;
		map[tank.y - 1][tank.x + 1] = 1;
		map[tank.y + 1][tank.x + 1] = 0;
		map[tank.y + 1][tank.x - 1] = 0;
	}
	else {
		map[tank.y - 1][tank.x - 1] = 0;
		map[tank.y - 1][tank.x + 1] = 1;
		map[tank.y + 1][tank.x + 1] = 1;
		map[tank.y + 1][tank.x - 1] = 0;
	}
}
function KeyMove(e) {
	let key = e.key;
	key.preventDefault;
	if (key == 'ArrowUp') {
		tank.nav = 12;
		tank.speed = 1;
	}
	if (key == 'ArrowRight') {
		tank.nav = 3;
		tank.speed = 1;
	}
	if (key == 'ArrowDown') {
		tank.nav = 6;
		tank.speed = 1;
	}
	if (key == 'ArrowLeft') {
		tank.nav = 9;
		tank.speed = 1;
	}
}
function KeyStop(key) {
	tank.speed = 0;
}
function Move() {
	if (tank.x == 1) { tank.left = false } else { tank.left = true };
	if (tank.x == 8) { tank.right = false } else { tank.right = true };
	if (tank.y == 1) { tank.up = false } else { tank.up = true };
	if (tank.y == 18) { tank.down = false } else { tank.down = true };
	if (tank.nav == 12 && tank.up == true) {
		tank.y -= tank.speed
	}
	else if (tank.nav == 3 && tank.right == true) {
		tank.x += tank.speed
	}
	else if (tank.nav == 6 && tank.down == true) {
		tank.y += tank.speed
	}
	else if (tank.nav == 9 && tank.left == true) {
		tank.x -= tank.speed
	}
}

