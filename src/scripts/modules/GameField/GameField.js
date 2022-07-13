import transition from "../../utils/transition";
import GameOver from "../GameOver";
import Timer from "../timer";
import Localstorage from "../Localstorage";
import MathTasks from "./mathTasks";

class GameField {
  constructor() {
    this.gameOver = new GameOver()

    this.mathTask = new MathTasks()
    this.mathTask.initialize()
  }

  stopBtn = document.querySelector('.game-field__btn')
  playerName = document.querySelector('.game-field__title span')

  currentPlayer = null
  gameMode = null
  timeout = null
  timer = null

  initialize = () => {
    this.stopBtn.addEventListener('click', this.stopGame)
  }

  startGame = () => {
    const input = document.querySelector('.game-field__answer')

    setTimeout(() => {
      input.focus()
    }, 300)

    this.timer = new Timer()
    this.mathTask.generateTask()

    this.currentPlayer = Localstorage.getCurrentGameData('player')
    this.gameMode = Localstorage.getCurrentGameData('mode')
    this.playerName.textContent = Localstorage.getCurrentGameData('player')

    if (this.gameMode === 'timeAttack') {
      this.timeout = setTimeout(this.stopGame, 90000)
      this.timer.startTimer()
    }
  }

  stopGame = () => {
    const gameFieldPage = document.querySelector('.game-field')
    const gameOverPage = document.querySelector('.game-over')

    this.gameOver.setScore(this.mathTask.getScore())

    if (this.gameMode === 'timeAttack') {
      this.timer.onTimesUp()
      clearTimeout(this.timeout)
    }

    transition(gameOverPage, gameFieldPage)
    this.resetPlayerData()
    this.mathTask.resetScore()
  }

  resetPlayerData = () => {
    const scoreElement = document.querySelector('.game-field__score')
    const result = document.querySelector('.game-field__answer')

    result.value = ''
    scoreElement.textContent = 0
  }


}

export default GameField