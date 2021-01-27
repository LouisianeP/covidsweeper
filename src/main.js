function loadBoard(shuffleBoard) {
    let html =''
    let i = 0
    for (boardLine of shuffleBoard) {
    html += `<div class="line line${i}">`;
    let j = 0;
        for (boardElement of boardLine) {
    html += `<div class="boardElement" id="${i}-${j}" oncontextmenu="return false;">`;
    html += `<img class="img" src='./imgs/${boardElement}.png' width="20" height="20">`;
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
    const bombsNumber =[];

    for (i=0; bombsNumber.length<10; i++) {
        bomb = Math.floor((Math.random()*matrixElements))
        if (bombsNumber.indexOf(bomb)==-1) bombsNumber.push(bomb)
    }
         
// console.log(bombsNumber)

    for (i=0; i<bombsNumber.length; i++) {
        let x = Math.floor(parseInt(bombsNumber[i])/9);  
        let y = parseInt(bombsNumber[i]) - 9*x;
        bombCoordinates=[x,y]
    bombs.push(bombCoordinates);    
    }
    


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

        if (x>0) {
            if (board[x-1][y] !=='X') board[x-1][y]+=1;
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
        
        // console.log(newElement)
        }   
    }

// case where the value = 1,2,3 ...
    if (theBoard[x][y]!==0 && theBoard[x][y]!=='X')  boardElement.querySelector('img').classList.remove('img')

// case where this is a bomb
    if (theBoard[x][y] =='X') {
    boardElement.querySelector('img').classList.remove('img')
    boardElement.querySelector('img').classList.add('lose')
    
    const smiley = document.querySelector('#face')
    smiley.innerHTML = '<img src="/imgs/face_lose.svg">'
    alert('You lose')
    }
    
}

function revealEverything() {
 const allElements = document.querySelectorAll(".boardElement")
 let correctVacccines = []
 let stringBombs = []
 console.log(vaccines);
 for (boardElement of allElements) {
    boardElement.querySelector('img').classList.remove('img')
 }
for (bomb of bombs) {
    stringBombs.push(`${bomb[0]}-${bomb[1]}`)
}
 
for (vaccine of vaccines) {
    if (stringBombs.indexOf(vaccine) !== -1 ) {
        goodVaccine = document.getElementById(`${vaccine}`)
        goodVaccine.querySelectorAll('img')[0].classList.add('win')
        goodVaccine.querySelectorAll('img')[1].classList.add('img')
        correctVacccines.push(`${vaccine}`)
    }
}

for (stringBomb of stringBombs) {
    if (correctVacccines.indexOf(stringBomb) === -1)  {
        const missedBomb = document.getElementById(`${stringBomb}`)
        missedBomb.querySelector('img').classList.add('lose')
        counterFalse += 1
    }
}
return counterFalse 
}




// Counter

// function displayTime() {
//     const date = new Date();
//     const time = date.toLocaleTimeString();
//     document.querySelector('#time_counter').innerText = time;
//   }
//   displayTime();
//   const createClock = setInterval(displayTime, 1000);


//Event Listeners
window.addEventListener('load', function (event) {
    const allElements = document.querySelectorAll(".boardElement")
    for (let i=0; i< allElements.length; i++) {
    allElements[i].addEventListener('click',function (event) {
        const filter = vaccines.filter(vaccine => JSON.stringify(vaccine) === JSON.stringify(allElements[i].id))
        if(filter.length%2 == 0) {
        revealValue(allElements[i])
        }
    });
    allElements[i].addEventListener('contextmenu',function (event) {
        if (virus !==0 || vaccines.indexOf(allElements[i].id)!==-1) {
        allElements[i].querySelectorAll('img')[1].classList.toggle('img');
        vaccines.push(allElements[i].id)
            console.log(JSON.stringify(allElements[i].id))
            console.log(vaccines)
            const filter = vaccines.filter(vaccine => JSON.stringify(vaccine) === JSON.stringify(allElements[i].id))
            if (filter.length%2 == 0)  virus +=1
            else virus+=-1 
        virus_tens=Math.floor(virus/10)
        virus_ones = virus-virus_tens*10
        if (virus!==-1) {
            document.querySelector('#mines_ones').innerHTML=`<img src="/imgs/d${virus_ones}.svg"></img>`
            document.querySelector('#mines_tens').innerHTML=`<img src="/imgs/d${virus_tens}.svg"></img>`
        }
    }
    });
    }   
    const smiley = document.querySelector('#face')
    // console.log(smiley)
    smiley.addEventListener('click',function (event) {
    revealEverything();
    console.log (counterFalse)
    if (counterFalse > 0) smiley.innerHTML = `<img src="/imgs/face_lose.svg"></img>`
    else smiley.innerHTML = `<img src="/imgs/face_win.png"></img>`
});

});

let counterFalse = 0
let bombs = []
let vaccines =[]
let vaccine=0
let virus =10
let virus_tens
let virus_ones
const theBoard = shuffleBoard()
console.log(theBoard)
loadBoard (theBoard)
