import { cast, solution, sum } from '../../utils/index.js';

const parse = (input) =>
  input
    .trim()
    .split('\n\n')
    .map((chunk, index) => {
      const deck = chunk.split('\n').map(cast).reverse();
      const name = deck.pop().slice(0, -1);
      return { name, index, deck };
    });

// Creates a hash based on the decks of the players
const hash = (players) => players.map((player) => player.deck).join(';');

// Plays through a combat game with given players, returning the winner
const play = (players, { mode = 'normal' } = {}) => {
  // Total number of cards across all players
  const total = sum(players.map((player) => player.deck.length));

  // Card configurations seen this game
  const seen = new Set();

  while (true) {
    // Anti-infinity protection with a per round key
    const rkey = hash(players);
    if (seen.has(rkey)) {
      return players[0];
    }
    seen.add(rkey);

    // Each player plays the card on the top of their deck
    let winner = null;
    let highest = -Infinity;
    const played = [];
    for (const player of players) {
      const top = player.deck.pop();
      if (top > highest) {
        winner = player;
        highest = top;
      }
      played.push(top);
    }

    // Recurse if applicable
    const recurse = played.every((card, index) => players[index].deck.length >= card);
    if (mode === 'recursive' && recurse) {
      // Slice decks for all players and play a recursive combat game with those
      const copies = players.map((player) => ({
        ...player,
        deck: player.deck.slice(-played[player.index]),
      }));
      const subwinner = play(copies, { mode: 'recursive' });

      // Ensure the winner is valid within this current game
      winner = players[subwinner.index];
    }

    // Ensure the winner receives the cards in their deck in the correct order
    const winningCard = played[winner.index];
    played.splice(winner.index, 1);
    winner.deck.unshift(...played, winningCard);

    if (winner.deck.length === total) {
      return winner;
    }
  }
};

// Calculates score for given player by inspecting their deck
const score = (player) => player.deck.reduce((total, card, index) => total + card * (index + 1), 0);

export const partOne = solution((input) => {
  const players = parse(input);
  const winner = play(players);
  return score(winner);
});

export const partTwo = solution.inefficient((input) => {
  const players = parse(input);
  const winner = play(players, { mode: 'recursive' });
  return score(winner);
});
