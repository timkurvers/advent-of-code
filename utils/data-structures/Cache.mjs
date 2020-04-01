class Cache extends Map {
  constructor(create = (key) => key) {
    super();

    this.create = create;
  }

  lookup(key) {
    let entry = this.get(key);
    if (!entry) {
      entry = this.create(key);
      this.set(key, entry);
    }
    return entry;
  }
}

export default Cache;
