const findWord = (str, wordToFind) => {
  const strArray = str.split('')
  console.log(strArray)
  const theMagicWord = strArray.filter((char, idx) => {
    console.log(idx, 'idx')

    if (
      char === wordToFind[0] &&
      str[idx + wordToFind.length - 1] === wordToFind[wordToFind.length - 1]
    ) {
      return idx
    }
  })
  return theMagicWord[0]
}

const string =
  'The park was dark. Almost as if light was all gone, never to return. She fumbled to find the keys to her car'

const hereIsYourWord = findWord(string, 'light')
console.log(hereIsYourWord)
