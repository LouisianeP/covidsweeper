function loadBoard(shuffleBoard) {
    let html =''
    let i = 0
    for (boardLine of shuffleBoard) {
    html += `<div class="line line${i}">`;
    let j = 0;
        for (boardElement of boardLine) {
    html += `<div class="boardElement" id="${i}-${j}" oncontextmenu="return false;">`;
    html += `<img class='img' src='./imgs/${boardElement}.png' width="20" height="20">`;
    html += `<img class="img" src='./imgs/vaccine.png' width="20" height="20">`;
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
    const bombsNumber =[];

    for (i=0; bombsNumber.length<10; i++) {
        bomb = Math.floor((Math.random()*matrixElements))
        if (bombsNumber.indexOf(bomb)==-1) bombsNumber.push(bomb)
    }
         
console.log(bombsNumber)

    for (i=0; i<bombsNumber.length; i++) {
        let x = Math.floor(parseInt(bombsNumber[i])/9);  
        let y = parseInt(bombsNumber[i]) - 9*x;
        bombCoordinates=[x,y]
        //  let addCoordinates 
        //     for (let j = 0;j<bombs.length; j++) {
        //     if (bombs[j][0] == x && bombs[j][1] == y) addCoordinates = false
        //     else addCoordinates = true
        //   }
        //   console.log(x,y)
        //   console.log(addCoordinates)
        //  if (addCoordinates === true || addCoordinates === undefined) 
        bombs.push(bombCoordinates);    
    }
    
    console.log(bombs)


    const board = Array(9).fill().map(() => Array(9).fill(0));
   
    for (i=0;i<bombs.length;i++) {
        let x = bombs[i][0];
        let y = bombs[i][1];
        board[x][y]='X';
        
        if (x<8) {
            if (board[x+1][y] !=='X') board[x+1][y]+=1;
            if (y>0 && board[x+1][y-1] !=='X') board[x+1][y-1]+=1;
            if (y<8 && board[x+1][y+1] !=='X') board[x+1][y+1]+=1; 
        }
        console.log(board)

        

        if (x>0) {
            console.log(board[x-1][y])
            if (board[x-1][y] !=='X') board[x-1][y]+=1;
            console.log(board[x-1][y])
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
    return board;
}



function revealValue(boardElement) {

   let coordinates = boardElement.id.split('-')
   let x = parseInt(coordinates[0])
   let y = parseInt(coordinates[1])
 //  console.log(theBoard[x][y])
//   console.log(x)
//   console.log(y)

// case where the value = 0

    if (theBoard[x][y]==0) {
        const boardElements = []
        boardElements.push([`${[x]}-${[y]}`])
        if (x>0 && y>0) boardElements.push([`${[x-1]}-${[y-1]}`])
        if (x>0) boardElements.push([`${[x-1]}-${[y]}`])
        if (x>0 && y<8) boardElements.push([`${[x-1]}-${[y+1]}`])
        if (y>0) boardElements.push([`${[x]}-${[y-1]}`])
        if (y<8) boardElements.push([`${[x]}-${[y+1]}`])
        if (x<8 && y>0) boardElements.push([`${[x+1]}-${[y-1]}`])
        if (x<8) boardElements.push([`${[x+1]}-${[y]}`])
        if (x<8 && y<8) boardElements.push([`${[x+1]}-${[y+1]}`])
    
    for (unrevealElement of boardElements) {
        newElement=document.getElementById(`${unrevealElement}`)
        newElement.querySelector('img').classList.remove('img')
        
        console.log(newElement)
        }   
    }

// case where the value = 1,2,3 ...
    if (theBoard[x][y]!==0 && theBoard[x][y]!=='X')  boardElement.querySelector('img').classList.remove('img')

// case where this is a bomb
    if (theBoard[x][y] =='X') {
    boardElement.querySelector('img').classList.remove('img')
    alert('You lose')
    }
    
}

// function putVaccine(boardElement) {
//     console.log(boardElement)
//     let html = document.createElement('img');
//     html.src = './imgs/vaccine.png'
//     html.width="20" 
//     html.height="20"
//     html.class = `img`
//     boardElement.appendChild(html)
//     vaccine +=1
//     console.log (vaccine)
// }

//Event Listeners
window.addEventListener('load', function (event) {
    const allElements = document.querySelectorAll(".boardElement")
    for (let i=0; i< allElements.length; i++) {
    allElements[i].addEventListener('click',function (event) {
        revealValue(allElements[i])
    });
    allElements[i].addEventListener('contextmenu',function (event) {
        allElements[i].querySelectorAll('img')[1].classList.toggle('img');
    });
    }
});


let vaccine=0

const theBoard = shuffleBoard()
// console.log(theBoard)
loadBoard (theBoard)
