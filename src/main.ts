import { getSandglassMatrixHTML } from './sand';
import {
  HOURS_IN_DAY,
  MINS_IN_HOUR,
  UPDATE_INTERVAL,
  MinuteSymbols,
  zeroPad,
  getHeaderString,
  getMinutesUntilMidnight
} from './utils';

const getClockMatrixHTML = (clockMatrix: string[][]) => {
  let clockString = '   ';
  for (let mins = 0; mins < MINS_IN_HOUR; ++mins) {
    clockString += zeroPad(mins) + ' ';
  }
  clockString += '\n';

  for (let hours = 0; hours < HOURS_IN_DAY; ++hours) {
    clockString += zeroPad(hours) + '  ';
    for (let mins = 0; mins < MINS_IN_HOUR; ++mins) {
      clockString += clockMatrix[hours][mins];
    }
    clockString += '\n';
  }

  return clockString;
};

const generateClockMatrix = (now: Date) => {
  const hours = now.getHours();
  const mins = now.getMinutes();
  const miliseconds = now.getTime();

  const clockMatrix: string[][] = new Array(HOURS_IN_DAY);

  for (let h = 0; h < HOURS_IN_DAY; ++h) {
    clockMatrix[h] = new Array(MINS_IN_HOUR);

    for (let m = 0; m < MINS_IN_HOUR; ++m) {
      if (h < hours || (h === hours && m < mins)) {
        clockMatrix[h][m] = MinuteSymbols.Past;
      }
      else if (h === hours && m === mins) {
        clockMatrix[h][m] = MinuteSymbols.Present[Math.floor(miliseconds / UPDATE_INTERVAL) % 2];
      }

      // Future
      else if (h > hours || (h === hours && m > mins)) {
        clockMatrix[h][m] = MinuteSymbols.Future;
      }
    }
  }

  return clockMatrix;
};

const updateClocks = () => {
  const now = new Date();
  const clockMatrix = generateClockMatrix(now);
  const secondsLeft = 60 - now.getSeconds();
  const minutesLeft = getMinutesUntilMidnight(now);
  document.querySelector('#clock').innerHTML = getClockMatrixHTML(clockMatrix);
  document.querySelector('#sandglass').innerHTML = getSandglassMatrixHTML(now);
  document.querySelector('#timeleft').innerHTML = getHeaderString(secondsLeft, minutesLeft);
};

setInterval(updateClocks, UPDATE_INTERVAL);