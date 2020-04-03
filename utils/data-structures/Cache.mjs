class Cache extends Map {
  constructor(create = (key) => key) {
    super();

    this.create = create;
  }

  lookup(key, create = this.create) {
    let entry = this.get(key);
    if (!entry) {
      entry = create(key);
      this.set(key, entry);
    }
    return entry;
  }
}

export default Cache;
