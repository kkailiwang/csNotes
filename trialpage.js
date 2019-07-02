
//let timerID;
resume();

function resume() {
	timerID = startTimer();
}

function startTimer() {
	return setInterval(() => {
	let d = new Date();
	let time = d.toLocaleTimeString();
	document.getElementById("currentTime").innerHTML = time;
	}, 1000);
}

function stop() {
	clearInterval(timerID);
}

