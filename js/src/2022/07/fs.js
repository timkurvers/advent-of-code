class Dir {
  constructor(name = '') {
    this.name = name;
    this.nodes = new Map();
  }

  create(target) {
    this.nodes.set(target.name, target);
  }

  get(name) {
    return this.nodes.get(name);
  }

  filter(cb) {
    const results = [];
    for (const node of this.nodes.values()) {
      if (cb(node)) {
        results.push(node);
      }
      if (node instanceof Dir) {
        results.push(...node.filter(cb));
      }
    }
    return results;
  }

  get size() {
    return Array.from(this.nodes.values()).reduce((total, node) => (
      total + node.size
    ), 0);
  }
}

class File {
  constructor(name, size = 0) {
    this.name = name;
    this.size = size;
  }
}

export { Dir, File };
