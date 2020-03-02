import { repeat } from './utils';

const MINUTE_SYM = {
  PAST: '.  ', // '⬛ ',
  FUTURE: '#  ', // '⬜ ',
  PRESENT: 'X  ', // '🔲 ',
  PRESENT_PROGRESS: ['˺', '˼', '˻', '˹'].map(c => c + '  '),
};

const START_HOUR = 0;
const START_MINUTE = 0
const UPDATE_INTERVAL = 500;
const HOURS_IN_DAY = 24;
const MINS_IN_HOUR = 60;

const zeroPad = (targetNum: number, digits: number): string => {
  const zeros = repeat("0", digits - String(targetNum).length);
  return zeros + targetNum.toString()
}

const getMinSecLeftString = () => {
  let now = new Date();
  let midnight = new Date().setHours(24, 0, 0, 0);
  let minutesLeft = Math.floor((midnight - now.getTime()) / 6e4);
  let secondsLeft = 60 - now.getSeconds();
  return `You have ${minutesLeft} minute${minutesLeft !== 1 ? 's' : ''} ${secondsLeft} second${secondsLeft !== 1 ? 's' : ''} remaining today`;
};

const printClockMatrix = (clockMatrix: string[][]) => {
  // Hour label padding to make room for minute labels
  let clockString = '    ';

  // Hour labels
  for (let i = 0; i < HOURS_IN_DAY; ++i) {
    const shiftedHours = (i + START_HOUR) % HOURS_IN_DAY;
    clockString += zeroPad(shiftedHours, 2) + ' ';
  }

  clockString += '\n';

  // Minute rows
  for (let mins = 0; mins < MINS_IN_HOUR; ++mins) {
    // Minute label
    const shiftedMinutes = (mins + START_MINUTE) % MINS_IN_HOUR;
    clockString += zeroPad(shiftedMinutes, 2) + '  ';

    // Current minute
    for (let hours = 0; hours < HOURS_IN_DAY; ++hours) {
      clockString += clockMatrix[hours][mins];
    }

    clockString += '\n';
  }

  return clockString;
};

const printSandglassMatrix = () => {
  return '';
}

const generateClockMatrix = () => {
  const date = new Date();
  const hours = (date.getHours() + HOURS_IN_DAY - START_HOUR) % HOURS_IN_DAY;
  const mins = (date.getMinutes() + MINS_IN_HOUR - START_MINUTE) % MINS_IN_HOUR;
  const ms = date.getTime();

  const clockMatrix: string[][] = new Array(HOURS_IN_DAY);

  for (let h = 0; h < HOURS_IN_DAY; ++h) {
    clockMatrix[h] = new Array(MINS_IN_HOUR);

    for (let m = 0; m < MINS_IN_HOUR; ++m) {
      // Past
      if (h < hours || (h === hours && m < mins)) {
        clockMatrix[h][m] = MINUTE_SYM.PAST;
      }

      // Present
      else if (h === hours && m === mins) {
        clockMatrix[h][m] =
          MINUTE_SYM.PRESENT_PROGRESS[
          Math.floor(ms / UPDATE_INTERVAL) %
          MINUTE_SYM.PRESENT_PROGRESS.length
          ];
      }

      // Future
      else if (h > hours || (h === hours && m > mins)) {
        clockMatrix[h][m] = MINUTE_SYM.FUTURE;
      }
    }
  }

  return clockMatrix;
};

const updateClocks = () => {
  const clockMatrix = generateClockMatrix();
  document.querySelector('#clock').innerHTML = printClockMatrix(clockMatrix);
  document.querySelector('#sandglass').innerHTML = printSandglassMatrix();
  document.querySelector('#timeleft').innerHTML = getMinSecLeftString();
};

setInterval(updateClocks, UPDATE_INTERVAL);