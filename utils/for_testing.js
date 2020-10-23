const palindrome = (string) => {
  return string.split('').reverse().join('')
}

const average = (array) => {
  if (array.length === 0) {
    return 0
  }
  return array.reduce((sum, item) => sum + item, 0) / array.length
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  // console.log('before: ', blogs)
  blogs.sort((a, b) => b.likes - a.likes)
  // console.log('after: ', blogs)
  return blogs[0]
}

module.exports = { palindrome, average, favoriteBlog }