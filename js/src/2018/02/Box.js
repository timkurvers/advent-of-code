const TRIPLES_REGEXP = /(\D)\1\1/g;
const DOUBLES_REGEXP = /(\D)\1/g;

class Box {
  constructor(id) {
    this.id = id;

    this.hasTriples = false;
    this.hasDoubles = false;

    this.letters = this.id.split('');

    // Handle triples
    const sorted = this.id.split('').sort().join('');
    const adjusted = sorted.replace(TRIPLES_REGEXP, (match, letter) => {
      this.hasTriples = true;
      return match.replace(new RegExp(letter, 'g'), '');
    });

    // Handle doubles
    this.hasDoubles = !!adjusted.match(DOUBLES_REGEXP);
  }

  lettersSharedWith(other) {
    return this.letters.filter((char, index) => other.letters[index] === char);
  }

  lettersDifferenceFrom(other) {
    return this.letters.filter((char, index) => other.letters[index] !== char);
  }
}

export default Box;
