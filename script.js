/** @format */

var popBox = document.getElementsByClassName("pop-up");
var ball = document.getElementById("ball");
var uprod = document.getElementById("top-element");
var downrod = document.getElementById("bottom-element");

//adding styles to pop-up box and ball
document.getElementById("cross").addEventListener("click", function () {
	popBox[0].style.visibility = "hidden";
	popBox[0].style.opacity = "0";
	popBox[0].style.transition = "visibility 1.2s linear 1s, opacity 200ms";
	alert("Starting the game!");
	ball.style.visibility = "visible";
	ball.style.transition = "1s all";
});

//storing rods' and ball's dimensions
let rodwidth = uprod.getBoundingClientRect().width;
let ballradius = ball.getBoundingClientRect().width;

let windowwidth = window.innerWidth;
let windowheight = window.innerHeight;

let currscore,
	maxscore,
	interval,
	rod,
	ballMoveX = 2,
	ballMoveY = 2;

//storing details to show on alert
const storeName = "rodname",
	storescore = "maxscrore",
	rod1name = "Upper Rod",
	rod2name = "Lower Rod";

let gamestatus = false;

//initial pop up and reseting after every load
(function () {
	rod = localStorage.getItem(storeName);
	maxscore = localStorage.getItem(storescore);

	if (rod == "null" || maxscore == "null") {
		// alert("Let's start!");
		maxscore = 0;
		rod = "Upper Rod";
	} else {
		alert(rod + " has maximum score of " + maxscore * 10);
    }
    
    

	reset(rod);
})();

//reseting subroutine for reload and game finish
function reset(rod) {
	currscore = 0;
	gamestatus = false;

	uprod.style.left = (window.innerWidth - uprod.offsetWidth) / 2 + "px";
    downrod.style.left = (window.innerWidth - downrod.offsetWidth) / 2 + "px";
    ball.style.left = (window.innerWidth - ball.offsetWidth) / 2 + "px";
    ball.style.top = (window.innerHeight - ball.offsetHeight) / 2 + "px";
    popBox[0].style.left = (window.innerWidth - popBox[0].offsetWidth) / 2 + "px";
    if(rod == rod1name) {
        ball.style.top = uprod.offsetTop + uprod.offsetHeight + "px";
        ballSpeedY = 2;
    }
    else if(rod == rod2name) {
        ball.style.top = downrod.offsetTop - downrod.offsetHeight + "px";
        ballSpeedY = -2;
    }
}

//storing the winner
function storeTheWin(rod, score)
{
    if(score > maxscore)
    {
        localStorage.setItem(storeName, rod);
        localStorage.setItem(storescore, score);

        maxscore = score;
    }

    clearInterval(interval);
    reset(rod);

    alert(rod + " wins this game with a score of " + score*10 + ". Max score is: " + maxscore*10);
}


//adding keyevent and functionality
window.addEventListener("keydown", function(event) {
    let rodSpeed = 30;
    let rodDimensions = uprod.getBoundingClientRect();

    if((event.key == 'l' || event.key == 'L') && rodDimensions.x + rodDimensions.width + 3 < window.innerWidth)
    {
        uprod.style.left = rodDimensions.x + rodSpeed + "px";
        downrod.style.left = uprod.style.left;
        console.log("pressed l");
    }

    else if((event.key == 'j' || event.key == 'J') && rodDimensions.x > 0)
    {
        uprod.style.left = rodDimensions.x - rodSpeed + "px";
        downrod.style.left = uprod.style.left;
        console.log("pressed j");
    }
});