class Shift {
  constructor() {
    this.events = [];
  }

  get summary() {
    return this.events.map((event) => event.label).join('\n');
  }

  get minutesAsleep() {
    return this.midnightHourState.filter(Boolean).length;
  }

  // Retrieves asleep (1) / awake (0) state for each minute from shift
  // start to last event capped to midnight hour (between 00:00 and 00:59)
  get midnightHourState() {
    const state = new Array(60).fill(0);

    // Step through each pair of asleep / awake event
    for (let i = 1; i < this.events.length; i += 2) {
      const asleep = this.events[i];
      const awake = this.events[i + 1];

      // This will not work if a guard falls asleep before the midnight hour
      if (asleep.hour === 0) {
        state.fill(1, asleep.minute, (awake && awake.minute) || 59);
      }
    }

    return state;
  }

  get visualMidnightHourState() {
    return this.midnightHourState.map((s) => (s ? '#' : '.')).join('');
  }
}

export default Shift;
