export const capitalize = (text) => {
  if (text !== '' && typeof text !== 'string')
    return false
  return text.charAt(0).toUpperCase() + text.slice(1)
}