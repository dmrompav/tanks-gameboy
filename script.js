const u = document.querySelector('.up'),
	r = document.querySelector('.right'),
	d = document.querySelector('.down'),
	l = document.querySelector('.left'),
	arrows = document.querySelector('.arrows'),
	shot = document.querySelector('.shot');


// * 1. Elements ======================================
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
	permission: true, //shoot permission or bomb on a field
	bomb: [],
},
	enemy = [
	],
	quantity = 0;


//* 2. Process ===========================================
TankDraw(tank);											//Let start
u.addEventListener('mousedown', KeyMoveUp);				//Click listeners
r.addEventListener('mousedown', KeyMoveRight);
d.addEventListener('mousedown', KeyMoveDown);
l.addEventListener('mousedown', KeyMoveLeft);
shot.addEventListener('click', KeyShot);
document.addEventListener('keydown', KeyMove);
var moveInt = setInterval(Move, 150),					//FPS
	bombMoveInt = setInterval(BombMove, 100),
	enemyMoveInt = setInterval(EnemyMove, 500),
	enemyCreateInt = setInterval(EnemyCreate, 3000);	//Timer
	enemyShotInt = setInterval(EnemyShot, 300);

//* 3.1. Global or player's functions========================================
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
function BombClear(tank) {
	if (!tank.permission) {
		a[tank.bomb[2]][tank.bomb[1]].style.backgroundColor = "#777777";
	}
}
function BombDraw(tank) {
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
	BombClear(tank);
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
	BombDraw(tank);
}
//* 3.2 Enemy functions ===============================================
function EnemyCreate() {
	if (quantity < 3) {
		enemy[quantity] = {
			x: 1,
			y: 1,
			nav: 6,
			speed: 1,
			permission: true,
			bomb: [],
		}
		quantity++;
		console.log(quantity)
	}
}
function EnemyMove() {
	for (i = 0; i < enemy.length; i++) {
		TankClear(enemy[i]);
		if (enemy[i].nav == 12 && enemy[i].y > 1) {
			enemy[i].y -= enemy[i].speed;
		}
		else if (enemy[i].nav == 3 && enemy[i].x < 8) {
			enemy[i].x += enemy[i].speed;
		}
		else if (enemy[i].nav == 6 && enemy[i].y < 18) {
			enemy[i].y += enemy[i].speed;
		}
		else if (enemy[i].nav == 9 && enemy[i].x > 1) {
			enemy[i].x -= enemy[i].speed;
		}
	}
	for (i = 0; i < enemy.length; i++) {
		TankDraw(enemy[i]);
		let changeNav = Math.floor(Math.random() * 10);
		if (changeNav == 9 || enemy[i].x == 1 || enemy[i].x == 8 || enemy[i].y == 1 || enemy[i].y == 18) {
			Nav = Math.floor(Math.random() * 4);
			enemy[i].nav = (Nav + 1) * 3;
		}
	}
}
function EnemyShot() {
	for (i = 0; i < enemy.length; i++) {
		if (enemy[i].permission) {
			enemy[i].bomb = [enemy[i].nav, enemy[i].x, enemy[i].y];
			if (enemy[i].bomb[0] == 12) {
				enemy[i].bomb[2] -= 1
			}
			else if (enemy[i].bomb[0] == 3) {
				enemy[i].bomb[1] += 1
			}
			else if (enemy[i].bomb[0] == 6) {
				enemy[i].bomb[2] += 1
			}
			else if (enemy[i].bomb[0] == 9) {
				enemy[i].bomb[1] -= 1
			}
		}
		enemy[i].permission = false;
		if (!enemy[i].permission) {
			a[enemy[i].bomb[2]][enemy[i].bomb[1]].style.backgroundColor = "#777777";
		}
		if (enemy[i].bomb[1] == 0 || enemy[i].bomb[1] == 9 || enemy[i].bomb[2] == 0 || enemy[i].bomb[2] == 19) {
			enemy[i].bomb = 0;
			enemy[i].permission = true;
		};
		if (enemy[i].bomb[0] == 12 && enemy[i].bomb[2] > 0) {
			enemy[i].bomb[2] -= 1
		}
		else if (enemy[i].bomb[0] == 3 && enemy[i].bomb[1] < 9) {
			enemy[i].bomb[1] += 1
		}
		else if (enemy[i].bomb[0] == 6 && enemy[i].bomb[2] < 19) {
			enemy[i].bomb[2] += 1
		}
		else if (enemy[i].bomb[0] == 9 && enemy[i].bomb[1] > 0) {
			enemy[i].bomb[1] -= 1
		}
		if (!enemy[i].permission) {
			a[enemy[i].bomb[2]][enemy[i].bomb[1]].style.backgroundColor = "#000000";
		}
		console.log("shot" + i)
	}
}