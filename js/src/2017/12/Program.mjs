class Program {
  constructor(id) {
    this.id = +id;
    this.connections = new Set();
  }

  get group() {
    const seen = new Set();
    const remaining = [this];

    while (remaining.length) {
      const program = remaining.pop();
      if (!seen.has(program)) {
        seen.add(program);
        remaining.push(...program.connections);
      }
    }

    return seen;
  }

  connect(program) {
    this.connections.add(program);
    program.connections.add(this);
  }

  static from(input) {
    const cache = new Map();

    const lookup = (id) => {
      let program = cache.get(id);
      if (!program) {
        program = new this(id);
        cache.set(id, program);
      }
      return program;
    };

    input.split('\n').forEach((line) => {
      const [id, rest] = line.split(' <-> ');
      const connections = rest.split(', ').map(Number).map(lookup);
      const program = lookup(+id);
      for (const connection of connections) {
        program.connect(connection);
      }
    });

    return Array.from(cache.values());
  }
}

export default Program;
