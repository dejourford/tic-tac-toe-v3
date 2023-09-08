const tile = document.querySelectorAll('.tile')
let message = document.querySelector('#message')
message.textContent = 'Enter Players to Start Game.'

// init game
let gameboard;
const Gameboard = () => {
    console.log('init game')
    // create game board
    gameboard = new Array(9).fill("")
    console.log(gameboard)
}


// create players and markers
const Player = (name, marker) => {
    return { name, marker }
}

// extract data from input fields on submit
const form = document.querySelector('form');
let p1, p2;

form.addEventListener('submit', function (e) {
    e.preventDefault()
    const p1Value = document.querySelector('#player1name').value.toLowerCase().trim()
    const p2Value = document.querySelector('#player2name').value.toLowerCase().trim()

    if (p1Value.length < 2 || p2Value.length < 2) return alert('You must enter a valid name!')

    p1 = Player(p1Value, 'X')
    p2 = Player(p2Value, 'O')
    console.log(p1)
    console.log(p2)

    playGame()
})


// place marker on board
function playGame() {
    let playerTurn = p1
    message.textContent = `It is ${playerTurn.name}'s Turn.`
    // const tile = document.querySelectorAll('.tile')
    tile.forEach((tile) => {
        tile.addEventListener('click', function(e) {
            const clickedTarget = e.target
            const position = clickedTarget.getAttribute('data-index')
            console.log(position)
            if (gameboard[position]) {
                console.log('nope')
            }
            else {
                gameboard[position] = playerTurn.marker
                updateBoard()
                // switch turns
                playerTurn = playerTurn === p1 ? p2 : p1
                message.textContent = `It is ${playerTurn.name}'s Turn.`
                checkForWinnner()
            }
            
            
        })
    })
        
     
    
}


// update board
function updateBoard() {
    console.log('the board has been updated')
    console.log(gameboard)
    for (let i = 0; i < gameboard.length; i++) {
        const playerMarker = gameboard[i]
        const position = i
        console.log(playerMarker, i)
        const tile = document.querySelector(`.tile[data-index='${i}']`)
        console.log(tile)
        tile.innerHTML = playerMarker
    }
  
}

// check for winner
function checkForWinnner() {
    const winCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    console.log(winCombinations)
    console.log(gameboard)

    // need to create an array of placements of current board
    // and assign it to a variable
    // take that variable and compare it to win combinations

    let gameboardToArrayP1 = []
    let gameboardToArrayP2 = []
    const consoleLogText = 'This player has played at:'
    
    
    for (let i = 0; i < gameboard.length; i++) {
        if (gameboard[i] == p1.marker) {
            gameboardToArrayP1.push(i)
            console.log(consoleLogText, gameboardToArrayP1)
        }
        else if (gameboard[i] == p2.marker) {
            gameboardToArrayP2.push(i)
            console.log(consoleLogText, gameboardToArrayP2)
        }
        for (combination of winCombinations) {
            const arraysMatch1 = combination.every((value, index) => value === gameboardToArrayP1[index])
            const arraysMatch2 = combination.every((value, index) => value === gameboardToArrayP2[index])
            if (arraysMatch1) {
                console.log('winner')
                message.textContent = 'PLAYER 1 HAS WON!'
                return
            }
            else if (arraysMatch2) {
                console.log('winner')
                message.textContent = 'PLAYER 2 HAS WON!'
                return
            }


        }
        
    }

    
}


Gameboard()

