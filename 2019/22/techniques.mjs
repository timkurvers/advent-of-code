export const dealIntoNewStack = deck => deck.reverse();

export const dealWithIncrement = (increment, deck) => {
  const { length } = deck;
  const stack = new Array(length);

  let pos = 0;
  for (let card = 0; card < length; ++card) {
    stack[pos] = deck[card];
    pos = (pos + increment) % length;
  }

  return stack;
};

export const cut = (amount, deck) => {
  if (amount > 0) {
    const sliced = deck.splice(0, amount);
    deck.push(...sliced);
  } else if (amount < 0) {
    const sliced = deck.splice(amount);
    deck.unshift(...sliced);
  }
  return deck;
};
