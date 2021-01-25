function loadBoard() {
    let html =''
    shuffleBoard = shuffleBoard();
    let i = 0
    for (boardLine of shuffleBoard) {
    html += `<div class="line line${i}">`;
        for (boardElement of boardLine) {
    html += `<div class="boardElement">`;
    html += `<div class="back"></div>`;
    html += `<div class="front"></div><img src='./imgs/${boardElement}.png' width="20" height="20">`;
    html += `</div>`;
      }
      html += `</div>`;
      i+=1
    };
   // console.log(html)
    board = document.querySelector('#board');
    board.innerHTML = html;
    console.log(board);
      const allElements = document.querySelectorAll(".boardElement")
      for (boardElement of allElements) {
        boardElement.addEventListener("click", revealValue())  
      } 
  }
  //<img src='./imgs/${boardElement}' width="15" height="15">



function shuffleBoard () {
    let matrixElements = 9*9;
    const bombs =[];
    for (i=0; bombs.length<11; i++) {
        bomb = Math.floor((Math.random()*matrixElements))
        if (bombs.indexOf(bomb)===-1) {
         let x = Math.floor(bomb/9);
         let y = bomb - 9*x;
         bombCoordinates=[x,y]
         bombs.push(bombCoordinates);
        }  
    }

    const board = Array(9).fill().map(() => Array(9).fill(0));

    console.log(bombs)
    for (bomb of bombs) {
        let x = bomb[0];
        let y = bomb[1];
        board[x][y]='X';
        if ((x<8) && board[x+1][y] !=='X') {
            board[x+1][y]+=1;
            if(y>0 && board[x+1][y-1] !=='X') board[x+1][y-1]+=1;
            if (y<8 && board[x+1][y+1] !=='X') board[x+1][y+1]+=1;
        }
        if ((x>0) && board[x-1][y] !=='X') {
            board[x-1][y]+=1;
            if(y>0 && board[x-1][y-1] !=='X') board[x-1][y-1]+=1;
            if (y<8 && board[x-1][y+1] !=='X') board[x-1][y+1]+=1;
        }
        if ((y<8) && board[x][y+1] !=='X') {
            board[x][y+1]+=1;
        }
        if ((y>0) && board[x][y-1] !=='X') {
            board[x][y-1]+=1;
        }
    }
    console.log(board)
    return board;
}

function revealValue() {
    
}


shuffleBoard()
loadBoard ()