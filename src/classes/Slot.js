export default class Slot {
  constructor(element) {
    this.element = element
  }

  renderCard(card) {
    const cardElement = document.createElement('div')
    cardElement.className = 'card'
    cardElement.dataset.suit = card.suit
    cardElement.dataset.value = card.value
    return cardElement
  }

  addCard(card) {
    const cardElement = this.renderCard(card)
    this.element.appendChild(cardElement)
  }

  clear() {
    this.element.innerHTML = ''
  }
}
