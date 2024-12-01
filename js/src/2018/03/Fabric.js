import Claim from './Claim.js';

class Fabric {
  constructor(claims) {
    this.claims = claims;

    this.size = claims.reduce((max, next) => Math.max(max, next.maxX), 0);

    this.grid = [];
    for (let i = 0; i < this.size; ++i) {
      for (let j = 0; j < this.size; ++j) {
        this.grid[i * this.size + j] = [];
      }
    }

    for (const claim of this.claims) {
      for (let i = claim.x; i < claim.maxX; ++i) {
        for (let j = claim.y; j < claim.maxY; ++j) {
          const track = this.grid[i * this.size + j];
          if (track.length === 1) {
            track[0].contested = true;
          }
          track.push(claim);
          if (track.length > 1) {
            claim.contested = true;
          }
        }
      }
    }
  }

  static from(input) {
    const claims = input
      .trim()
      .split('\n')
      .map((definition) => new Claim(definition));
    return new this(claims);
  }
}

export default Fabric;
