class MathTasks {
  num1 = document.querySelector('.game-field__operand--first')
  num2 = document.querySelector('.game-field__operand--second')
  operator = document.querySelector('.game-field__operator')
  result = document.querySelector('.game-field__answer')
  scoreElement = document.querySelector('.game-field__score')
  taskElement = document.querySelector('.game-field__content')

  score = 0
  correctScore = 0
  incorrectScore = 0
  example = null

  initialize = () => {
    this.result.addEventListener('keydown', (e) => this.quizAction(e))
    this.generateTask()
  }

  quizAction = (e) => {
    if (!this.result.value) return

    if (e.keyCode === 13) {
      if (Number(this.result.value) === Number(this.example.result)) {
        this.onCorrectAnswer()
      } else {
        this.onWrongAnswer()
      }
      this.scoreElement.textContent = this.score
      this.result.value = ''
      this.generateTask()
    }
  }

  onCorrectAnswer = () => {
    const plusScore = document.querySelector('.plus-score')

    plusScore.classList.add('plus-score-animation')
    setTimeout(() => {plusScore.classList.remove('plus-score-animation')}, 700)

    this.score += 1
    this.correctScore += 1
  }

  onWrongAnswer = () => {
    this.incorrectScore += 1

    this.scoreElement.classList.add('trambling-animation')

    setTimeout(() => {this.scoreElement.classList.remove('trambling-animation')}, 400)
    if(this.score !== 0) {
      this.score += -1
    }
  }

  generateTask = () => {
    this.taskElement.classList.add('slide-animation')
    setTimeout(() => {
      this.taskElement.classList.remove('slide-animation')
    },720)

    setTimeout(() => {
      this.example = this.generateExample()
      this.renderExample(this.example)
    },300)
  }

  getScore = () => {
    return {
      score: this.score,
      correctScore: this.correctScore,
      incorrectScore: this.incorrectScore
    }
  }

  getRandom = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
  }

  operators = ['-', '+', '*', '/']

  sum = (a, b, operator) => {
    if (operator === '/') return a / b
    if (operator === '+') return a + b
    if (operator === '-') return a - b
    return a * b
  }

  generateExample = () => {
    const operator = this.operators[this.getRandom(0, this.operators.length - 1)]
    let num1 = this.getRandom(1, 10)
    let num2 = this.getRandom(1, 10)

    if (operator === '/') {
      while (!Number.isInteger(num1 / num2)) {
        num1 = this.getRandom(1, 10)
        num2 = this.getRandom(1, 10)
      }
    }
    const result = this.sum(num1, num2, operator)
    return {num1, num2, operator, result}
  }

  renderExample = (data) => {
    this.num1.textContent = data.num1
    this.num2.textContent = data.num2
    this.operator.textContent = data.operator
  }

  resetScore = () => {
    this.score = 0;
    this.correctScore = 0;
    this.incorrectScore = 0;
  }
}

export default MathTasks