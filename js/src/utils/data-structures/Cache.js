class Cache extends Map {
  constructor({
    init = (key) => key,
    hash = (key) => key,
  } = {}) {
    super();

    this.init = init;
    this.hash = hash;
  }

  lookup(key) {
    const hash = this.hash(key);
    let entry = this.get(hash);
    if (!entry) {
      entry = this.init(key, hash);
      this.set(hash, entry);
    }
    return entry;
  }
}

export default Cache;
