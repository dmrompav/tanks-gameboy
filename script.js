const u = document.querySelector('.up'),
	r = document.querySelector('.right'),
	d = document.querySelector('.down'),
	l = document.querySelector('.left'),
	arrows = document.querySelector('.arrows'),
	shot = document.querySelector('.shot');


// *Elements ======================================
//Map ------------------
var row = document.querySelectorAll('.row'),
	a = [];
for (i = 0; i < row.length; i++) {
	a[i] = row[i].querySelectorAll('.col');
}
//Tanks ----------------
var tank = {
	x: 4,
	y: 9,
	nav: 12,  //12-3-6-9
	speed: 0,
	permission: true,
	bomb: [],
};

//*Process ===========================================
MapDraw();											//Let start
u.addEventListener('mousedown', KeyMoveUp);			//Click listeners
r.addEventListener('mousedown', KeyMoveRight);
d.addEventListener('mousedown', KeyMoveDown);
l.addEventListener('mousedown', KeyMoveLeft);
shot.addEventListener('click', KeyShot);
document.addEventListener('keydown', KeyMove);
setInterval(Move, 150);								//FPS
setInterval(BombMove, 50);

//*Functions ========================================
function MapDraw() {														//Drawing -----------
	TankDraw(tank);
}
function TankClear(tank) {
	a[tank.y - 1][tank.x].style.backgroundColor = "#777777";
	a[tank.y][tank.x - 1].style.backgroundColor = "#777777";
	a[tank.y][tank.x].style.backgroundColor = "#777777";
	a[tank.y][tank.x + 1].style.backgroundColor = "#777777";
	a[tank.y + 1][tank.x].style.backgroundColor = "#777777";
	a[tank.y - 1][tank.x - 1].style.backgroundColor = "#777777";
	a[tank.y - 1][tank.x + 1].style.backgroundColor = "#777777";
	a[tank.y + 1][tank.x - 1].style.backgroundColor = "#777777";
	a[tank.y + 1][tank.x + 1].style.backgroundColor = "#777777";
}
function TankDraw(tank) {
	a[tank.y - 1][tank.x].style.backgroundColor = "#000000";
	a[tank.y][tank.x - 1].style.backgroundColor = "#000000";
	a[tank.y][tank.x].style.backgroundColor = "#000000";
	a[tank.y][tank.x + 1].style.backgroundColor = "#000000";
	a[tank.y + 1][tank.x].style.backgroundColor = "#000000";

	if (tank.nav == 12) {
		// a[tank.y - 1][tank.x - 1].style.backgroundColor = "#000000";
		// a[tank.y - 1][tank.x + 1].style.backgroundColor = "#000000";
		a[tank.y + 1][tank.x - 1].style.backgroundColor = "#000000";
		a[tank.y + 1][tank.x + 1].style.backgroundColor = "#000000";
	}
	else if (tank.nav == 3) {
		a[tank.y - 1][tank.x - 1].style.backgroundColor = "#000000";
		// a[tank.y - 1][tank.x + 1].style.backgroundColor = "#000000";
		a[tank.y + 1][tank.x - 1].style.backgroundColor = "#000000";
		// a[tank.y + 1][tank.x + 1].style.backgroundColor = "#000000";
	}
	else if (tank.nav == 6) {
		a[tank.y - 1][tank.x - 1].style.backgroundColor = "#000000";
		a[tank.y - 1][tank.x + 1].style.backgroundColor = "#000000";
		// a[tank.y + 1][tank.x - 1].style.backgroundColor = "#000000";
		// a[tank.y + 1][tank.x + 1].style.backgroundColor = "#000000";
	}
	else {
		// a[tank.y - 1][tank.x - 1].style.backgroundColor = "#000000";
		a[tank.y - 1][tank.x + 1].style.backgroundColor = "#000000";
		// a[tank.y + 1][tank.x - 1].style.backgroundColor = "#000000";
		a[tank.y + 1][tank.x + 1].style.backgroundColor = "#000000";
	}
}
function BombClear() {
	if (!tank.permission) {
		a[tank.bomb[2]][tank.bomb[1]].style.backgroundColor = "#777777";
	}
}
function BombDraw() {
	if (!tank.permission) {
		a[tank.bomb[2]][tank.bomb[1]].style.backgroundColor = "#000000";
	}
}
function KeyMove(e) {														//Keys --------------
	let key = e.key;
	if (key == 'ArrowUp') {
		KeyMoveUp()
	}
	else if (key == 'ArrowRight') {
		KeyMoveRight()
	}
	else if (key == 'ArrowDown') {
		KeyMoveDown()
	}
	else if (key == 'ArrowLeft') {
		KeyMoveLeft()
	}
	else {
		KeyShot();
	}
}
function KeyMoveUp() {
	tank.nav = 12;
	tank.speed = 1;
	document.addEventListener('keyup', KeyStop);
	arrows.addEventListener('mouseup', KeyStop);
}
function KeyMoveRight() {
	tank.nav = 3;
	tank.speed = 1;
	document.addEventListener('keyup', KeyStop);
	arrows.addEventListener('mouseup', KeyStop);
}
function KeyMoveDown() {
	tank.nav = 6;
	tank.speed = 1;
	document.addEventListener('keyup', KeyStop);
	arrows.addEventListener('mouseup', KeyStop);
}
function KeyMoveLeft() {
	tank.nav = 9;
	tank.speed = 1;
	document.addEventListener('keyup', KeyStop);
	arrows.addEventListener('mouseup', KeyStop);
}
function KeyStop() {
	tank.speed = 0;
}
function KeyShot() {
	if (tank.permission) {
		tank.bomb = [tank.nav, tank.x, tank.y];
	}
	tank.permission = false;
}


function Move() {															//Functions ----------
	TankClear(tank);
	if (tank.nav == 12 && tank.y > 1) {
		tank.y -= tank.speed;
	}
	else if (tank.nav == 3 && tank.x < 8) {
		tank.x += tank.speed;
	}
	else if (tank.nav == 6 && tank.y < 18) {
		tank.y += tank.speed;
	}
	else if (tank.nav == 9 && tank.x > 1) {
		tank.x -= tank.speed;
	}
	TankDraw(tank);
}
function BombMove() {
	BombClear();
	if (tank.bomb[1] == 0 || tank.bomb[1] == 9 || tank.bomb[2] == 0 || tank.bomb[2] == 19) {
		tank.bomb = 0;
		tank.permission = true;
	};
	if (tank.bomb[0] == 12 && tank.bomb[2] > 0) {
		tank.bomb[2] -= 1
	}
	else if (tank.bomb[0] == 3 && tank.bomb[1] < 9) {
		tank.bomb[1] += 1
	}
	else if (tank.bomb[0] == 6 && tank.bomb[2] < 19) {
		tank.bomb[2] += 1
	}
	else if (tank.bomb[0] == 9 && tank.bomb[1] > 0) {
		tank.bomb[1] -= 1
	}
	BombDraw();
}















// function BombDraw() {
// 	// if (!bomb.length == 0) {
// 	// 	for (i = 0; i < bomb.length; i++) {
// 	// 		map[bomb[i][1]][bomb[i][0]] = 1;
// 	// 	}
// 	// }
// }
// function KeyMove(e) {
// 	let key = e.key;
// 	key.preventDefault;
// 	if (key == 'ArrowUp') {
// 		KeyMoveUp(event);
// 	}
// 	if (key == 'ArrowRight') {
// 		KeyMoveRight(event);
// 	}
// 	if (key == 'ArrowDown') {
// 		KeyMoveDown(event);
// 	}
// 	if (key == 'ArrowLeft') {
// 		KeyMoveLeft(event);
// 	}
// }
// function KeyMoveUp(event) {														//Keys ------------------
// 	event.preventDefault();
// 	tank.nav = 12;
// 	tank.speed = 1;
// }
// function KeyMoveRight(event) {
// 	event.preventDefault();
// 	tank.nav = 3;
// 	tank.speed = 1;
// }
// function KeyMoveDown(event) {
// 	event.preventDefault();
// 	tank.nav = 6;
// 	tank.speed = 1;
// }
// function KeyMoveLeft(event) {
// 	event.preventDefault();
// 	tank.nav = 9;
// 	tank.speed = 1;
// }
// function KeyStop(key) {
// 	tank.speed = 0;
// }

// function KeyShot() {
// 	// if (tank.qua == 2) {
// 	// 	tank.qua == 0
// 	// }
// 	// bomb[tank.qua] = [tank.nav, tank.x, tank.y];
// 	// tank.qua += 1;
// }
// function Move() {																//functions ---------------
// 	if (tank.x == 1) { tank.left = false } else { tank.left = true }
// 	if (tank.x == 8) { tank.right = false } else { tank.right = true }
// 	if (tank.y == 1) { tank.up = false } else { tank.up = true }
// 	if (tank.y == 18) { tank.down = false } else { tank.down = true }
// 	if (tank.nav == 12 && tank.up == true) {
// 		tank.y -= tank.speed
// 	}
// 	else if (tank.nav == 3 && tank.right == true) {
// 		tank.x += tank.speed
// 	}
// 	else if (tank.nav == 6 && tank.down == true) {
// 		tank.y += tank.speed
// 	}
// 	else if (tank.nav == 9 && tank.left == true) {
// 		tank.x -= tank.speed
// 	}
// }
// function BombMove() {	
// 	// for (i = 0; i < bomb.length; i++) {
// 	// 	if (bomb[i][0] == 12) {
// 	// 		bomb[i][2] -= 1
// 	// 	}
// 	// 	else if (bomb[i][0] == 3) {
// 	// 		bomb[i][1] += 1
// 	// 	}
// 	// 	else if (bomb[i][0] == 6) {
// 	// 		bomb[i][2] += 1
// 	// 	}
// 	// 	else if (bomb[i][0] == 9) {
// 	// 		bomb[i][1] -= 1
// 	// 	}
// 	// }
// }