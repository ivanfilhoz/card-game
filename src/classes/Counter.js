import { formatTime } from '../util/helpers'

export default class Counter {
  constructor(element) {
    this.element = element
    this.time = 0
  }

  getTime() {
    return this.time
  }

  update() {
    this.element.innerHTML = formatTime(this.time)
  }

  reset() {
    this.time = 0
    this.update()
  }

  start() {
    this.interval = window.setInterval(() => {
      this.time++
      this.update()
    }, 1000)
  }

  stop() {
    window.clearInterval(this.interval)
  }

  penalty(seconds = 5) {
    this.time += seconds
    this.update()

    // Penalty color effect
    if (this.timeout) window.clearTimeout(this.timeout)
    this.element.classList.add('penalty')
    this.timeout = window.setTimeout(
      () => this.element.classList.remove('penalty'),
      1000
    )
  }
}
