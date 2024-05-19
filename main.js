window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
});

document.addEventListener('DOMContentLoaded', function () {
  const setupForm = document.querySelector('#setup-form');
  const setupContainer = document.querySelector('.setup');
  const timerContainer = document.querySelector('.timer');

  const titleElement = document.querySelector('#timerTitle');
  const subtitleElement = document.querySelector('#timerSubtitle');

  const timeSeconds = document.querySelector('#timeSeconds');
  const timeMinutes = document.querySelector('#timeMinutes');
  const timeHours = document.querySelector('#timeHours');

  const fullscreenBtn = document.querySelector('#fullscreenButton');
  const resetBtn = document.querySelector('#resetButton');
  const startBtn = document.querySelector('#startButton');
  const stopBtn = document.querySelector('#stopButton');

  const body = document.querySelector('body');

  const actions = document.querySelector('.actions');

  const first = document.querySelector('.first');

  const overlay = document.querySelector('.overlay');
  const overlayCounter = document.querySelector('#overlayCounter');

  let title = 'Taitaja2024 web development competition';
  let subtitle = 'Module A';

  let hours = 0;
  let minutes = 1;
  let seconds = 0;

  let timerInterval;
  let totalSeconds;
  let countUp = false;

  setupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    title = formProps.title;
    subtitle = formProps.subtitle;

    hours = Number(formProps.hours) || 0;
    seconds = Number(formProps.seconds) || 0;
    minutes = Number(formProps.minutes) || 0;

    setupContainer.style.display = 'none';
    timerContainer.style.display = 'block';
    actions.style.display = 'flex';

    setupTimer();
  });

  //setupTimer();

  function setupTimer() {
    titleElement.textContent = title;
    subtitleElement.textContent = subtitle;
    totalSeconds = hours * 3600 + minutes * 60 + seconds;
    updateTimerDisplay();
  }

  startBtn.addEventListener('click', function () {
    countStart();
  });

  stopBtn.addEventListener('click', function () {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  });

  resetBtn.addEventListener('click', resetTimer);

  fullscreenBtn.addEventListener('click', function () {
    if (!document.fullscreenElement) {
      document.querySelector('body').requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });

  function updateTimerDisplay() {
    let displayHours = Math.floor(Math.abs(totalSeconds) / 3600);
    let displayMinutes = Math.floor((Math.abs(totalSeconds) % 3600) / 60);
    let displaySeconds = Math.abs(totalSeconds) % 60;

    if (totalSeconds == 0) {
      const sound = new Audio('/assets/ending.mp3');
      const playSound = (count) => {
        if (count > 0) {
          sound.play();
          sound.onended = () => {
            playSound(count - 1);
          };
        }
      };
      playSound(3);
      body.classList.add('overtime');
    }

    if (totalSeconds < 0) {
      first.classList.add('over');
    } else {
      first.classList.remove('over');
    }

    timeHours.textContent = String(displayHours).padStart(2, '0');
    timeMinutes.textContent = String(displayMinutes).padStart(2, '0');
    timeSeconds.textContent = String(displaySeconds).padStart(2, '0');
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function resetTimer() {
    /*         if (timerInterval) {
                        clearInterval(timerInterval);
                        timerInterval = null;
                    }
            
                    totalSeconds = (hours * 3600) + (minutes * 60) + seconds; 
                    updateTimerDisplay(); */
    location.reload();
  }

  let countSeconds = 3;

  async function countStart() {
    countSeconds = 3;
    overlay.style.display = 'flex';
    overlayCounter.textContent = countSeconds;

    countInterval = setInterval(() => {
      countSeconds--;
      overlayCounter.textContent = countSeconds;

      if (countSeconds == 0) {
        clearInterval(countInterval);
        overlay.style.display = 'none';
        startTimer();
      }
    }, 1000);
  }

  function startTimer() {
    stopTimer();

    timerInterval = setInterval(() => {
      totalSeconds--;

      if (!countUp && totalSeconds < 0) {
        countUp = true;
      }

      updateTimerDisplay();
    }, 1000);
  }
});
