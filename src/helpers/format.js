// Replaces underscores with whitespace

export const removeUnderscore = (str) => {
  return str.replace(/[_-]/g, " ")
}
