export const UPDATE_INTERVAL = 500;
export const HOURS_IN_DAY = 24;
export const MINS_IN_HOUR = 60;

export const MinuteSymbols = {
  Past: '.  ',
  Present: ['˺  ', '˻  '],
  Future: '#  ',
}

export const zeroPad = (targetNum: number): string => {
  const numberString = targetNum.toString();
  return (targetNum < 10) ? '0' + numberString : numberString;
}

export const getMinutesUntilMidnight = (now: Date): number => {
  let midnight = new Date().setHours(24, 0, 0, 0);
  return Math.floor((midnight - now.getTime()) / 6e4);
}

export const getHeaderString = (secondsLeft: number, minutesLeft: number): string => {
  return `You have ${minutesLeft} minute${minutesLeft !== 1 ? 's' : ''} and ${secondsLeft} second${secondsLeft !== 1 ? 's' : ''} remaining today`;
};