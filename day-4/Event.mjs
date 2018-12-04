const DEFINITION_REGEXP = /\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (?:Guard #(\d+) )?(.+)/;

class Event {
  constructor(definition) {
    this.label = definition;

    const match = definition.match(DEFINITION_REGEXP);
    this.year = +match[1];
    this.month = +match[2];
    this.day = +match[3];
    this.hour = +match[4];
    this.minute = +match[5];

    this.guardID = match[6] ? +match[6] : null;
    this.action = `${match[7]}`;

    this.at = new Date(
      this.year, this.month, this.day,
      this.hour, this.minute,
    );
    this.offset = +this.at;
  }
}

export default Event;
