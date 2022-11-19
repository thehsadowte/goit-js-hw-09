// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const inputEl = document.querySelector('input#datetime-picker');
const timer = document.querySelectorAll('span.value');
let deadline;
let intervalId;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    deadline = selectedDates[0];
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future', {
        position: 'center-top',
        clickToClose: true,
        backOverlay: true,
      });
      return;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(inputEl, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startBtn.addEventListener('click', startBtnHandler);

function startBtnHandler(event) {
  startBtn.disabled = true;

  intervalId = setInterval(() => {
    const currentTime = new Date();
    const difference = deadline - currentTime;

    if (difference <= 0) {
      clearInterval(intervalId);
      return;
    }
    const convertedTime = convertMs(difference);
    Object.entries(convertedTime).map(([name, value], i) => {
      timer[i].textContent = addLeadingZero(value);
    });
  }, 1000);
}
