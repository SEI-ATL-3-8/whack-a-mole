const START_TIME = 10 // seconds
const NUM_HOLES = 16
for (let i = 0; i < 16; i++) {
  const hole = document.createElement('div')
  hole.classList.add('hole')
  document.querySelector('.game-board').append(hole)
}

let timeRemaining = START_TIME
let score = 0
let tickId = null
let moleId = null

document.querySelector('.time-number').innerText = timeRemaining
document.querySelector('.score-number').innerText = score

const tick = () => {
  timeRemaining --
  document.querySelector('.time-number').innerText = timeRemaining
  if (timeRemaining <= 0) {
    clearInterval(tickId)
    clearInterval(moleId)
    document.querySelector('.game-over').classList.remove('hidden')
    document.querySelector('.game-board').classList.add('hidden')
    document.querySelector('.final-score').innerText = score
  }
}

tickId = setInterval(tick, 1000)

const addMole = () => {
  const allHoles = document.querySelectorAll('.hole')
  const randomIndex = Math.floor(Math.random() * allHoles.length)
  allHoles[randomIndex].classList.add('mole')
}

moleId = setInterval(addMole, 400)

for (hole of document.querySelectorAll('.hole')) {
  hole.addEventListener('click', (event) => {
    if (event.target.classList.contains('mole')) {
      event.target.classList.remove('mole')
      score ++
      document.querySelector('.score-number').innerText = score
    }
  })
}

document.querySelector('.reset-button').addEventListener('click', () => {
  timeRemaining = START_TIME
  score = 0
  document.querySelector('.time-number').innerText = timeRemaining
  document.querySelector('.score-number').innerText = score

  document.querySelector('.game-board').classList.remove('hidden')
  document.querySelector('.game-over').classList.add('hidden')
  tickId = setInterval(tick, 1000)
  moleId = setInterval(addMole, 400)

  for (hole of document.querySelectorAll('.hole')) {
    hole.classList.remove('mole')
  }
})