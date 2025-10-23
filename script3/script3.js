// 3. Создай счетчик, который отслеживает и отображает активное время пользователя на странице.Время должно обновляться каждую секунду и сохраняться в SessionStorage.

let activeTime = 0;
let timer;

if (sessionStorage.getItem('activeTime')) {
  activeTime = parseInt(sessionStorage.getItem('activeTime'), 10);
} // Проверяем, есть ли сохраненное время в SessionStorage

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function updateActiveTime() {
  const time = document.getElementById('time');
  if (time) {
    time.textContent = formatTime(activeTime);
  }
}

function startTimer() {
  if (!timer) {
    timer = setInterval(() => {
      activeTime++;
      sessionStorage.setItem('activeTime', activeTime);
      updateActiveTime();
    }, 1000);
  }
}

["mousemove", "keydown", "scroll", "click"].forEach(event => {
  window.addEventListener(event, startTimer);
});

updateActiveTime();
startTimer();

