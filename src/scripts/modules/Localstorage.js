class Localstorage {
  static initalize = () => {
    if (!localStorage.getItem("practice")) {
      localStorage.setItem("practice", JSON.stringify([]))
    }
    if (!localStorage.getItem("timeAttack")) {
      localStorage.setItem("timeAttack", JSON.stringify([]))
    }
  }


  static getCurrentGameData = (prop) => {
    const res = JSON.parse(localStorage.getItem('currentGame'))
    return res ? res[prop] : null
  }

  static setCurrentGameData = (obj = {}) => {
    localStorage.setItem('currentGame', JSON.stringify(obj))
  }

  static getData = (mode) => {
    const res =  JSON.parse(localStorage.getItem(mode))
    return res ? res : []
  }

  static setData = (mode, newData) => {
    const userData = JSON.parse(localStorage.getItem(mode))

    let isPlayerExist = userData.some(item => item.name === newData.name)

    if (!isPlayerExist) {
      userData.push(newData)

      localStorage.setItem(mode, JSON.stringify(userData))
    } else {
      const currentPlayerStats = userData.find(item => item.name === newData.name)

      if (currentPlayerStats.score < newData.score) {
        const updatedData = userData.map(item => item.name === newData.name ? newData : item)
        localStorage.setItem(mode, JSON.stringify(updatedData))
      }
    }
  }
}

export default Localstorage
