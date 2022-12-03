const state = document.getElementById("state")

const winConditions =  [
    ["top-left","middle-left","bottom-left"],
    ["top-middle","middle-middle","bottom-middle"],
    ["top-right","middle-right","bottom-right"],

    ["top-left","middle-middle","bottom-right"],
    ["bottom-left", "middle-middle", "top-right"],

    ["top-left","top-middle","top-right"],
    ["middle-left","middle-middle","middle-right"],
    ["bottom-left","bottom-middle","bottom-right"],
]
const NEWBOARD = {
    "top-left": 0, "top-middle": 0, "top-right": 0, 
    "middle-left": 0, "middle-middle": 0, "middle-right": 0, 
    "bottom-left": 0, "bottom-middle": 0, "bottom-right": 0
}
let currBoard = {
    "top-left": 0, "top-middle": 0, "top-right": 0, 
    "middle-left": 0, "middle-middle": 0, "middle-right": 0, 
    "bottom-left": 0, "bottom-middle": 0, "bottom-right": 0
}
let PIECES = {1: "X", 2:"O"}
let player = 1
let continueGame = true
let usedPositions = []


const handleClick = (e) => {
    if (continueGame) {
        let position = e.target.id
        if (usedPositions.includes(position)){
            return
        }
        usedPositions.push(position)
        currBoard[position] = player
        updateBoard()
        if (checkWin(player)){
            winState()
        }
        changePlayer()
    }
}

const changePlayer = () => {
    if (player === 1){
        player = 2
    }else {
        player = 1
    }
}

const updateBoard = () => {
    for (const key in currBoard) {
        let square = document.getElementById(key)
        let val = currBoard[key]
        if (val !== 0){
            square.innerText = PIECES[val]
        }else{
            square.innerText = ""
        }
    }
    console.log(currBoard)
}

const checkWin = (p) => {    
    let playerPositions = []
    for (const key in currBoard) {
        let val = currBoard[key]
        if (val === p){
            playerPositions.push(key)
        }
    }

    for (let i = 0; i < winConditions.length; i++){
        let condition = winConditions[i]
        if (checkWinAux(condition, playerPositions)){
            return true
        }
    }

    return false
}

const checkWinAux = (condition, positions) => {
    let count = 0
    for (let i = 0; i < condition.length; i++){
        if (positions.includes(condition[i])){
            count += 1
        }
    }
    
    return (count === condition.length)
}

const winState = () => {
    state.innerText = `Player ${player} Wins!`
    continueGame = false
}

const resetGame = () => {
    currBoard = structuredClone(NEWBOARD)
    updateBoard()
    player = 1
    continueGame = true
    state.innerText = "" 
    usedPositions = []  
}