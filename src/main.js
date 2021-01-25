function loadBoard() {
    shuffleBoard = shuffleBoard();
    shuffleBoard.forEach((boardLine) => {
        let i = 0
    html += `<div class="line line${i}">`;
        for (boardElement of boardLine) {
    html += `<div class="boardElement">`;
      html += `<div class="back"></div>`;
      html += `<div class="front"><img src='./imgs/${boardElement}' width="15" height="15"></div>`;

  
      }
      html += `</div>`;
    });
    memoryBoard.innerHTML = html;
      .querySelectorAll(".boardElement")
      .forEach((boardElement) => boardElement.addEventListener("click", revealValue()));
  }

function shuffleBoard () {
    let matrixElements = 9*9;
    const bombs =[];
    for (i=0; bombs.length<10; i++) {
        bomb = Math.floor((Math.random()*matrixElements))
        if (bombs.indexOf(bomb)===-1) {
         let x = Math.floor(bomb/9);
         let y = bomb - 9*x;
         bombCoordinates=[x,y]
         bombs.push(bombCoordinates);
        }  
    }

    const board = Array(9).fill().map(() => Array(9).fill(0));


    for (bomb of bombs) {
        let x = bomb[0];
        let y = bomb[1];
        board[x][y]='X';
        if ((x<8) && board[x+1][y] !=='X') board[x+1][y]+=1;
        if ((y<8) && board[x][y+1] !=='X') board[x][y+1]+=1;
        if ((x>0) && board[x-1][y] !=='X') board[x-1][y]+=1;
        if ((y>0) && board[x][y-1] !=='X') board[x][y-1]+=1;
    }
    return board;
}

function revealValue() {
    
}


shuffleBoard()
