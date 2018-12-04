const cache = new Map();

class Guard {
  constructor(id) {
    this.id = id;
    this.shifts = [];
  }

  get totalMinutesAsleep() {
    return this.shifts.reduce((sum, shift) => (
      sum + shift.minutesAsleep
    ), 0);
  }

  get mostAsleepPerMinute() {
    const states = this.shifts.map(shift => shift.midnightHourState);

    let minute = 0;
    let max = -Infinity;
    for (let i = 0; i < 60; ++i) {
      const frequency = states.reduce((sum, state) => sum + state[i], 0);
      if (frequency > max) {
        minute = i;
        max = frequency;
      }
    }

    return { minute, frequency: max };
  }

  static for(id) {
    let guard = cache.get(id);
    if (!guard) {
      guard = new this(id);
      cache.set(id, guard);
    }
    return guard;
  }
}

export default Guard;
