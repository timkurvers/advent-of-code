/* eslint-disable prefer-destructuring */

class Component {
  constructor(index, name) {
    this.name = name;

    this.key = name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();

    const parts = name.split(/-| /);
    this.compound = parts[0];
    this.type = parts[parts.length - 1];

    this.index = index;
    this.bit = 1 << (index + 1);
  }
}

export default Component;
