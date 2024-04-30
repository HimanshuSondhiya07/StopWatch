const timerEl = document.getElementById("timer");
const startButtonEl = document.getElementById("start");
const stopButtonEl = document.getElementById("stop");
const resetButtonEl = document.getElementById("reset");
const lapButtonEl = document.getElementById("lap");
const themeSelectorEl = document.getElementById("theme");
const lapTimesEl = document.getElementById("lap-times");

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let lapNumber = 1;

function startTimer() {
  startTime = Date.now() - elapsedTime;

  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    timerEl.textContent = formatTime(elapsedTime);
  }, 10);

  startButtonEl.disabled = true;
  stopButtonEl.disabled = false;
  lapButtonEl.disabled = false;
}

function stopTimer() {
  clearInterval(timerInterval);
  startButtonEl.disabled = false;
  stopButtonEl.disabled = true;
  lapButtonEl.disabled = true;
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  timerEl.textContent = "00:00:00";
  lapNumber = 1;
  lapButtonEl.disabled = true;
  startButtonEl.disabled = false;
  stopButtonEl.disabled = true;
  lapTimesEl.innerHTML = "";
}

function recordLap() {
  const lapTime = formatTime(elapsedTime);
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap ${lapNumber}: ${lapTime}`;
  lapTimesEl.appendChild(lapItem);
  lapNumber++;
}

function formatTime(elapsedTime) {
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  return (
    (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
    ":" +
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" +
    (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") +
    "." +
    (milliseconds > 9 ? milliseconds : "0" + milliseconds)
  );
}

function changeTheme() {
  const selectedTheme = themeSelectorEl.value;
  timerEl.className = selectedTheme;
}

startButtonEl.addEventListener("click", startTimer);
stopButtonEl.addEventListener("click", stopTimer);
resetButtonEl.addEventListener("click", resetTimer);
lapButtonEl.addEventListener("click", recordLap);
themeSelectorEl.addEventListener("change", changeTheme);
