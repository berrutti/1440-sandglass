const originalClock = [
  ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
  ['0', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '0'],
  ['0', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '0'],
  ['0', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '0'],
  ['0', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '0'],
  ['0', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '0'],
  ['-', '0', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '0', '-'],
  ['-', '-', '0', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '0', '-', '-'],
  ['-', '-', '-', '0', '.', '.', '.', '.', '.', '.', '.', '.', '.', '0', '-', '-', '-'],
  ['-', '-', '-', '-', '0', '.', '.', '.', '.', '.', '.', '.', '0', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '0', '0', '.', '.', '.', '0', '0', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '0', '.', '0', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '0', ' ', '0', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '0', ' ', '0', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '0', '0', ' ', ' ', ' ', '0', '0', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '0', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '0', '-', '-', '-', '-'],
  ['-', '-', '-', '0', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '0', '-', '-', '-'],
  ['-', '-', '0', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '0', '-', '-'],
  ['-', '0', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '0', '-'],
  ['0', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '0'],
  ['0', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '0'],
  ['0', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '0'],
  ['0', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '0'],
  ['0', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '0'],
  ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
]

let currentClock = originalClock.map(element => element);

function updateClock() {
  for (let i = 22; i > 0; i--) {
    for (let j = 0; j < 16; j++) {
      if (currentClock[i][j] === '.') {
        if (currentClock[i + 1][j] === ' ') {
          currentClock[i][j] = ' ';
          currentClock[i + 1][j] = 'U';
        } else {
          if (currentClock[i + 1][j - 1] === ' ') {
            currentClock[i][j] = ' ';
            currentClock[i + 1][j - 1] = 'U';
          } else if (currentClock[i + 1][j + 1] === ' ') {
            currentClock[i][j] = ' ';
            currentClock[i + 1][j + 1] = 'U';
          } else if (currentClock[i + 1][j - 2] === ' ') {
            currentClock[i][j] = ' ';
            currentClock[i + 1][j - 2] = 'U';
          } else if (currentClock[i + 1][j + 2] === ' ') {
            currentClock[i][j] = ' ';
            currentClock[i + 1][j + 2] = 'U';
          }
        }
      }
    }
  }
}

function cleanClock() {
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 16; j++) {
      if (currentClock[i][j] === 'U') {
        currentClock[i][j] = '.';
      }
    }
  }
}

function drawClock() {
  currentClock.forEach(row => {
    let rowString = '';
    row.forEach(cell => {
      if (cell === '-') {
        rowString += ' ';
      } else {
        rowString += cell;
      }
    })
    console.log(rowString);
  });
}

let counter = 0;

function tick() {
  process.stdout.write('\033c');
  updateClock();
  cleanClock();
  drawClock();
  counter++;
  if (counter == 120) {
    process.stdout.write('\033c');
    console.log('One Minute')
    counter = 0;
    currentClock = originalClock.map(element => element);
  }
}
setInterval(tick, 2000);