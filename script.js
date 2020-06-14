/** @format */

var popBox = document.getElementsByClassName("pop-up");
var ball = document.getElementById("ball");
var uprod = document.getElementById("top-element");
var downrod = document.getElementById("bottom-element");

var flag = false;

//adding styles to pop-up box and ball
document.getElementById("cross").addEventListener("click", function () {
	if(!flag)
	{
		flag = true;
		popBox[0].style.visibility = "hidden";
		popBox[0].style.opacity = "0";
		popBox[0].style.transition = "visibility 1.2s linear 1s, opacity 200ms";
		ball.style.visibility = "visible";
		alert("Let's start");
	}
});

//storing rods' and ball's dimensions
// let rodwidth = uprod.getBoundingClientRect().width;
// let ballradius = ball.getBoundingClientRect().width;
// let windowwidth = window.innerWidth;
// let windowheight = window.innerHeight;

let currscore,
	maxscore,
	interval,
	rod,
	ballSpeedX = 3,
	ballSpeedY = 3;

//storing details to show on alert
const storeName = "thename",
	storescore = "thenamescore",
	rod1name = "Upper Rod",
	rod2name = "Lower Rod";

let gamestatus = false;

//reseting after every load
(function () {
	rod = localStorage.getItem(storeName);
	maxscore = localStorage.getItem(storescore);

	if (rod === "null" || maxscore === "null") {
		maxscore = 0;
		rod = "Upper Rod";
	}
	reset(rod);
})();

//reseting subroutine for reload and game finish
function reset(rod) {
	uprod.style.left = (window.innerWidth - uprod.offsetWidth) / 2 + "px";
	downrod.style.left = (window.innerWidth - downrod.offsetWidth) / 2 + "px";
	ball.style.left = (window.innerWidth - ball.offsetWidth) / 2 + "px";
	ball.style.top = (window.innerHeight - ball.offsetHeight) / 2 + "px";
	popBox[0].style.left = (window.innerWidth - popBox[0].offsetWidth) / 2 + "px";

	if (rod === rod1name) {
		ball.style.top = uprod.offsetTop + uprod.offsetHeight + "px";
		ballSpeedY = 3;
	} else if (rod === rod2name) {
		ball.style.top = downrod.offsetTop - downrod.offsetHeight + "px";
		ballSpeedY = -3;
	}
	currscore = 0;
	gamestatus = false;
}

//storing the winner
function storeTheWin(rod, score) {
	if (score > maxscore) {
		maxscore = score;
		localStorage.setItem(storeName, rod);
		localStorage.setItem(storescore, score);
	}

	clearInterval(interval);
	reset(rod);

	alert(rod + " wins this game with a score of " + score * 10 + ". Max score is: " + maxscore * 10);
}

//adding keyevent and functionality
window.addEventListener("keypress", function () {
	let rodSpeed = 30;
	let rodDimensions = uprod.getBoundingClientRect();

	if ((event.key === "l" || event.key === "L") && rodDimensions.x + rodDimensions.width + 3 < window.innerWidth) {
		uprod.style.left = rodDimensions.x + rodSpeed + "px";
		downrod.style.left = uprod.style.left;
		console.log("pressed l");
	} else if ((event.key === "j" || event.key === "J") && rodDimensions.x > 0) {
		uprod.style.left = rodDimensions.x - rodSpeed + "px";
		downrod.style.left = uprod.style.left;
		console.log("pressed j");
	}

	//if enter is pressed
	if (event.code === "Enter" || event.which === 32) {
		if (!gamestatus) {
			gamestatus = true;
			let ballDimensions = ball.getBoundingClientRect();
			console.log("inside window!");

			let xdir = ballDimensions.x;
			let ydir = ballDimensions.y;
			let ballwidth = ballDimensions.width;

			let uprodheight = uprod.offsetHeight;
			let downrodheight = downrod.offsetHeight;

			let uprodwidth = uprod.offsetWidth;
			let downrodwidth = downrod.offsetWidth;

			interval = setInterval(function () {
				xdir += ballSpeedX;
				ydir += ballSpeedY;
				console.log("xdir " + xdir + " ydir: " + ydir);
				rod1X = uprod.getBoundingClientRect().x;
				rod2X = downrod.getBoundingClientRect().x;

				ball.style.left = xdir + "px";
				ball.style.top = ydir + "px";
				console.log("ball.style.left: " + ball.style.left + " ball.style.top: " + ball.style.top);
				if (ballwidth + xdir > windowwidth || xdir < 0) {
					ballSpeedX = -ballSpeedX;
					console.log("in if");
				}

				let ballPos = xdir + ballwidth / 2;

				if (ydir <= uprodheight) {
					ballSpeedY = -ballSpeedY;
					currscore++;
					console.log("in second if");
					if (ballPos < rod1X || ballPos > rod1X + uprodwidth) {
						storeTheWin(rod2name, currscore);
					}
				} else if (ydir + ballwidth >= windowheight - downrodheight) {
					ballSpeedY = -ballSpeedY;
					currscore++;

					if (ballPos < rod2X || ballPos > rod2X + downrodwidth) {
						storeTheWin(rod1name, currscore);
					}
				}
			}, 10);
		}
	}
});
