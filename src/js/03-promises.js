import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  let { delay, step, amount } = formEl.elements;
  delay = Number(delay.value);
  step = Number(step.value);
  amount = Number(amount.value);
  console.log(delay, step, amount);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ i, delay }) => {
        Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
      })
      .catch(({ i, delay }) => {
        Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
      });

    delay += step;
  }
}

function createPromise(i, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ i, delay });
      } else {
        reject({ i, delay });
      }
    }, delay);
  });
}
