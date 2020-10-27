export const $ = document.getElementById.bind(document)

export const padNumber = number => ('00' + number).slice(-2)

export const formatTime = seconds => {
  const mm = padNumber(Math.floor(seconds / 60))
  const ss = padNumber(seconds % 60)
  return `${mm}:${ss}`
}
