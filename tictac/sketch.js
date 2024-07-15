let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  
  let players = ['PlayerX', 'PlayerO'];
  
  let currentPlayerIndex;
  let availableSpots = [];
  
  function initializeGame() {
    createCanvas(400, 400);
    frameRate(30);
    currentPlayerIndex = floor(random(players.length));
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        availableSpots.push([i, j]);
      }
    }
  }
  
  function areEqual(a, b, c) {
    return (a == b && b == c && a != '');
  }
  
  function checkWinner() {
    let winner = null;
  
    // Check horizontally
    for (let i = 0; i < 3; i++) {
      if (areEqual(gameBoard[i][0], gameBoard[i][1], gameBoard[i][2])) {
        winner = gameBoard[i][0];
      }
    }
  
    // Check vertically
    for (let i = 0; i < 3; i++) {
      if (areEqual(gameBoard[0][i], gameBoard[1][i], gameBoard[2][i])) {
        winner = gameBoard[0][i];
      }
    }
  
    // Check diagonally
    if (areEqual(gameBoard[0][0], gameBoard[1][1], gameBoard[2][2])) {
      winner = gameBoard[0][0];
    }
    if (areEqual(gameBoard[2][0], gameBoard[1][1], gameBoard[0][2])) {
      winner = gameBoard[2][0];
    }
  
    if (winner == null && availableSpots.length == 0) {
      return 'tie';
    } else {
      return winner;
    }
  }
  
  function takeTurn() {
    let index = floor(random(availableSpots.length));
    let spot = availableSpots.splice(index, 1)[0];
    let i = spot[0];
    let j = spot[1];
    gameBoard[i][j] = players[currentPlayerIndex];
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  }
  
  function drawGame() {
    background(255);
    let w = width / 3;
    let h = height / 3;
    strokeWeight(4);
  
    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);
  
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        let x = w * i + w / 2;
        let y = h * j + h / 2;
        let spotValue = gameBoard[i][j];
        textSize(32);
        if (spotValue == players[1]) {
          noFill();
          ellipse(x, y, w / 2);
        } else if (spotValue == players[0]) {
          let xr = w / 4;
          line(x - xr, y - xr, x + xr, y + xr);
          line(x + xr, y - xr, x - xr, y + xr);
        }
      }
    }
  
    let result = checkWinner();
    if (result != null) {
      noLoop();
      let resultDisplay = createP('');
      resultDisplay.style('font-size', '32pt');
      if (result == 'tie') {
        resultDisplay.html("It's a Tie!")
      } else {
        resultDisplay.html(`${result} wins!`);
      }
    } else {
      takeTurn();
    }
  }
  
  initializeGame();
  