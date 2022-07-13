class Timer {
  FULL_DASH_ARRAY = 283
  WARNING_THRESHOLD = 10
  ALERT_THRESHOLD = 5

  COLOR_CODES = {
    info: {
      color: "green"
    },
    warning: {
      color: "orange",
      threshold: this.WARNING_THRESHOLD
    },
    alert: {
      color: "red",
      threshold: this.ALERT_THRESHOLD
    }
  }

  TIME_LIMIT = 90
  timePassed = 0
  timeLeft = this.TIME_LIMIT
  timerInterval = null
  remainingPathColor = this.COLOR_CODES.info.color

  formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    let seconds = time % 60

    if (seconds < 10) {
      seconds = `0${seconds}`
    }

    return `${minutes}:${seconds}`
  }

  a = document.querySelector(".game-field__timer").innerHTML = `
    <div class="base-timer">
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
            id="base-timer-path-remaining"
            stroke-dasharray="283"
            class="base-timer__path-remaining ${this.remainingPathColor}"
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      <span id="base-timer-label" class="base-timer__label">
        ${this.formatTime(this.timeLeft)}
      </span>
    </div>`

  startTimer = () => {
    this.timerInterval = setInterval(() => {
      this.timePassed = this.timePassed += 1
      this.timeLeft = this.TIME_LIMIT - this.timePassed
      document.getElementById("base-timer-label").innerHTML = this.formatTime(
        this.timeLeft
      )
      this.setCircleDasharray()
      this.setRemainingPathColor(this.timeLeft)

      if (this.timeLeft === 0) {
        this.onTimesUp()
      }
    }, 1000)
  }

  setRemainingPathColor = (timeLeft) => {
    const {alert, warning, info} = this.COLOR_CODES
    if (timeLeft <= alert.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color)
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color)
    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color)
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color)
    }
  }

  calculateTimeFraction = () => {
    const rawTimeFraction = this.timeLeft / this.TIME_LIMIT
    return rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction)
  }

  setCircleDasharray = () => {
    const circleDasharray = `${(
      this.calculateTimeFraction() * this.FULL_DASH_ARRAY
    ).toFixed(0)} 283`
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray)
  }

  onTimesUp = () => {
    clearInterval(this.timerInterval)
  }
}

export default Timer