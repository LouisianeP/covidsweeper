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
        boardElements.push([`${[x]}-${[y]}`])
        zeroList.push([`${[x]}-${[y]}`])
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
    }
}

// case where the value = 1,2,3 ...
    if (theBoard[x][y]!==0 && theBoard[x][y]!=='X')  boardElement.querySelector('img').classList.remove('img')

// case where this is a bomb
    if (theBoard[x][y] =='X') {
    boardElement.querySelector('img').classList.remove('img')
    boardElement.querySelector('img').classList.add('lose')
    
    const smiley = document.querySelector('#face')
    smiley.innerHTML = '<img src="./imgs/face_lose.svg">'
    alert('You lose')
    }
    
}

function revealEverything() {
 const allElements = document.querySelectorAll(".boardElement")
 let correctVacccines = []
 let stringBombs = []
// console.log(vaccines);
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
function startTimer() {
    let seconds = 0
    let seconds_hundreds=0
    let seconds_tens=0
    let seconds_ones=0
    interval = setInterval(function () {
        seconds+=1
        seconds_hundreds=Math.floor(seconds/100)
        seconds_tens=Math.floor((seconds-seconds_hundreds*100)/10)
        seconds_ones=seconds-seconds_tens*10-seconds_hundreds*100
        document.querySelector('#seconds_hundreds').innerHTML=`<img src="./imgs/d${seconds_hundreds}.svg"></img>`
        document.querySelector('#seconds_tens').innerHTML=`<img src="./imgs/d${seconds_tens}.svg"></img>`
        document.querySelector('#seconds_ones').innerHTML=`<img src="./imgs/d${seconds_ones}.svg"></img>`
    }, 1000);
    if (seconds >999) clearInterval(interval);
}

//Start New Game
function startNewGame() {
    // virus = 10
    // counterFalse = 0
    // bombs = []
    // vaccines =[]
    // vaccine = 0
    startTimer ()
    // virus_tens=Math.floor(virus/10)
    // virus_ones = virus-virus_tens*10
    // document.querySelector('#mines_ones').innerHTML=`<img src="./imgs/d${virus_ones}.svg"></img>`
    // document.querySelector('#mines_tens').innerHTML=`<img src="./imgs/d${virus_tens}.svg"></img>`
    // smiley = document.querySelector('#face')
    // smiley.innerHTML = `<img src="./imgs/face_unpressed.svg"></img>`

// const allElements = document.querySelectorAll(".boardElement")

// for (let i=0; i< allElements.length; i++) {
//     allElements[i].addEventListener('click',function (event) {
//         const filter = vaccines.filter(vaccine => JSON.stringify(vaccine) === JSON.stringify(allElements[i].id))
//         if(filter.length%2 == 0) {
//         revealValue(allElements[i])
//         }
//     });
//     allElements[i].addEventListener('contextmenu',function (event) {
//        rightClick(allElements[i])
//     });      

}

//Right Click Function
function rightClick(boardElement) {
    if (virus !==0 || vaccines.indexOf(boardElement.id)!==-1) {
        boardElement.querySelectorAll('img')[1].classList.toggle('img');
        vaccines.push(boardElement.id)
            console.log(JSON.stringify(boardElement.id))
            console.log(vaccines)
            const filter = vaccines.filter(vaccine => JSON.stringify(vaccine) === JSON.stringify(boardElement.id))
            if (filter.length%2 == 0)  virus +=1
            else virus+=-1 
        virus_tens=Math.floor(virus/10)
        virus_ones = virus-virus_tens*10
        if (virus!==-1) {
            document.querySelector('#mines_ones').innerHTML=`<img src="./imgs/d${virus_ones}.svg"></img>`
            document.querySelector('#mines_tens').innerHTML=`<img src="./imgs/d${virus_tens}.svg"></img>`
        }
        }
}

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
           rightClick(allElements[i])
        });
    } 
       
    const smiley = document.querySelector('#face')
    smiley.addEventListener('click',function (event) {
        revealEverything();
        console.log (counterFalse)
        if (counterFalse > 0) {
            smiley.innerHTML = `<img src="./imgs/face_lose.svg"></img>`
            let snd = new Audio("./sounds/lose.mp3"); 
            snd.play();
        }
        else {
            smiley.innerHTML = `<img src="./imgs/face_win.png"></img>`
            let snd = new Audio("./sounds/win31.mp3"); 
            snd.play();
        }
    });

    const startButton =document.querySelector('#button_newgame')
    startButton.addEventListener('click',function (event) {
        window.location.reload()
    }); 


    const startTimer =document.querySelector('#button_timer')
    startTimer.addEventListener('click',function (event) {
        startNewGame()
    }); 
   
});

let zeroList = []
let zeroTemp = []
let counterFalse = 0
let bombs = []
let vaccines =[]
let vaccine = 0
let virus = 10
let virus_tens
let virus_ones
let theBoard = []
const boardElements = []

 theBoard = shuffleBoard()
 loadBoard (theBoard)
 console.log(theBoard)