class Game {
    constructor() {
        this.gameRestartBtn = document.getElementById('gameRestart')
        this.gameStatus = document.getElementById('gameStatus')
        this.xWins = document.getElementById('xWins')
        this.oWins = document.getElementById('oWins')
        this.submitBtn = document.getElementById('submitBtn')
        this.playerOne = document.getElementById('playerOne')
        this.playerTwo = document.getElementById('playerTwo')


        this.winCount = {
            x: 0,
            o: 0
        }
        this.gameActive = true 
        this.currentPlayer = 'X'
        this.gameState = [
            '','','',
            '','','',
            '','',''
        ]

        this.winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6]
        ]

        this.players = {
            player1: 'Player 1',
            player2: 'Player 2'
        }



        
    }
    
    init() {
        this.playerOne.innerText = this.players.player1
        this.playerTwo.innerText = this.players.player2
        this.getPlayersNames()
        this.currPlayerTurn()
        this.handleCellClicked()
        this.gameRestartBtn.addEventListener('click', ()=> {
            this.restartGame()
        })
        
    }
    /**
     * 
     * Methods
     */

    // messages
    currPlayerTurn() {
        const message = `It's ${this.currentPlayer}'s turn`
        return this.gameStatus.innerText = message
    }

    drawMessage() {
        const message = `Game ended in a draw`
        return this.gameStatus.innerText = message
    }

    winningMessage() {
        const message = `Player ${this.currentPlayer} has won!`
        return this.gameStatus.innerText = message
    }


    // handle clicked cell
    handleCellClicked() {
        // grab cell 
        const cells = document.querySelectorAll('.cell')
        cells.forEach(cell => {
            const cellIdx = parseInt(cell.getAttribute('data-cell-index'))
            cell.addEventListener('click', ()=> {
                // console.log(cellIdx)
                // if the indexed item is not an empty string OR if gameActive is false
                if (this.gameState[cellIdx] != '' || !this.gameActive) {
                    return
                }

                this.handleCellPlayed(cell, cellIdx)
                this.resultValidation()
            })
        })
    } 

    handleCellPlayed(cell, cellIdx) {
        this.gameState[cellIdx] = this.currentPlayer
        // console.log(this.gameState)
        this.currentPlayer == 'X' ? cell.classList.add('red') : cell.classList.add('blue')
        cell.innerText = this.currentPlayer
    }

    resultValidation() {
        let gameWon = false

        for (let i = 0; i<= 7; i++) {
            const win = this.winningConditions[i]

            let a = this.gameState[win[0]]
            let b = this.gameState[win[1]]
            let c = this.gameState[win[2]]

            if (a == '' || b == '' || c == ''){
                continue
            }

            if (a == b && b == c) {
                gameWon = true
                break
            }
        }

        if (gameWon) {
            const tallyMark = 'x'
            this.winningMessage()
            const winner = this.currentPlayer
            if (winner == 'X') {
                this.winCount.x = this.winCount.x + 1
                this.xWins.innerHTML += `<span class="tally"> ${tallyMark} </span>`
            } else {
                this.winCount.o = this.winCount.o + 1
                this.oWins.innerHTML += `<span class="tally"> ${tallyMark} </span>`
            }
            this.checkWinCount()
            this.gameActive = false 
            return 
        }

        const roundDraw = !this.gameState.includes('')
        if (roundDraw) {
            this.drawMessage()
            this.gameActive = false 
            return 
        }

        this.playerChange()
    }

    playerChange() {
        this.currentPlayer = this.currentPlayer === 'X' ? "O" : "X"
        this.currPlayerTurn()
    }

    restartGame() {
        this.gameActive = true
        this.currentPlayer = 'X'
        this.gameState = [
            '','','',
            '','','',
            '','',''
        ]
        this.currPlayerTurn()
        document.querySelectorAll('.cell').forEach(cell => {
            cell.innerText = ''
            cell.classList.remove('blue')
        })
    }

    checkWinCount() {
        let oWinTotal = this.winCount.o
        let xWinTotal = this.winCount.x 
        
        console.log(`O wins: ${oWinTotal}, X wins: ${xWinTotal}`)

        if (oWinTotal == 3) {
            this.gameStatus.innerText = `${this.players.player2} is the SUPREME VICTOR!`
        } else if (xWinTotal == 3){
            this.gameStatus.innerText = `${this.players.player1} is the SUPREME VICTOR!`
        }

        this.gameActive = false
        // this.restartGame()
    }

    getPlayersNames() {
        const submitBtn = this.submitBtn
        const playerOne = this.playerOne
        const playerTwo = this.playerTwo

        
        submitBtn.addEventListener('click', (e)=> {
            e.preventDefault()
            const player2Name = document.getElementById('player2').value 
            const player1Name = document.getElementById('player1').value 
            // console.log(player1Name, player2Name)
            this.players.player1 = player1Name
            this.players.player2 = player2Name
            playerOne.innerText = this.players.player1
            playerTwo.innerText = this.players.player2
        })
    }
    

}

const action = new Game()

action.init()