function loadBoard(shuffleBoard) {
    let html =''
    let i = 0
    for (boardLine of shuffleBoard) {
    html += `<div class="line line${i}">`;
    let j = 0;
        for (boardElement of boardLine) {
    html += `<div class="boardElement" id="${i}-${j}">`;
    html += `<img class="img" src='./imgs/${boardElement}.png' width="20" height="20">`;
    html += `</div>`;
    j+=1
      }
      html += `</div>`;
      i+=1
    board = document.querySelector('#board');
    board.innerHTML = html;
    }  
  }


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

 //   console.log(bombs)
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
 //   console.log(board)
    return board;
}

function revealValue(boardElement) {
    //const target = event.currentTarget;
   console.log(boardElement.id)
   let coordinates = boardElement.id.split('-')
   let x = coordinates[0]
   let y = coordinates[1]
   console.log(theBoard[x][y])
// case where the value = 0
for (i=0;i<theBoard.length;i++)


// case where the value = 1,2,3 ...
    if (theBoard[x][y]!==0 && theBoard[x][y]!=='X')    boardElement.querySelector('img').classList.remove('img')

// case where this is a bomb



 //  console.log('Holy Molly')
    
}

window.addEventListener('load', function (event) {
    const allElements = document.querySelectorAll(".boardElement")
    for (let i=0; i< allElements.length; i++) {
    allElements[i].addEventListener('click',function (event) {
        revealValue(allElements[i])
    });
    }
});


const theBoard = shuffleBoard()
console.log(theBoard)
loadBoard (theBoard)