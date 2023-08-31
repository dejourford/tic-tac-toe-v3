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
    const p1Value = document.querySelector('#player1name').value.trim()
    const p2Value = document.querySelector('#player2name').value.trim()

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
    const tile = document.querySelectorAll('.tile')
    tile.forEach((tile) => {
        tile.addEventListener('click', function(e) {
            const clickedTarget = e.target
            const position = clickedTarget.getAttribute('data-index')
            console.log(position)
            // tile.innerHTML = playerTurn.marker
            if (gameboard[position]) {
                console.log('nope')
            }
            else {
                gameboard[position] = playerTurn.marker
                playerTurn = playerTurn === p1 ? p2 : p1
                message.textContent = `It is ${playerTurn.name}'s Turn.`
            }
            
            console.log(gameboard)
        })
    })
        
     
    
}


// update board
// check for winner
// switch turns

Gameboard()

