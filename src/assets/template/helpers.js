function getRange(users, letter) {
  const OFFSET = 4;
  return `${letter}${OFFSET + 1}:${letter}${OFFSET + users.length}`;
}

function startCase(text = '') {
  const words = text.toLocaleLowerCase().split(' ');
  const formatWords = words.map(
    (word) => word[0].toUpperCase() + word.slice(1)
  );
  return formatWords.join(' ');
}
