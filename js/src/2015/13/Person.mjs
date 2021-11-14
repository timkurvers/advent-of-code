class Person {
  constructor(name) {
    this.name = name;
    this.reactions = [];
  }

  happinessWith(left, right) {
    let happiness = 0;
    for (const { person, change } of this.reactions) {
      if (person === left || person === right) {
        happiness += change;
      }
    }
    return happiness;
  }
}

export default Person;
