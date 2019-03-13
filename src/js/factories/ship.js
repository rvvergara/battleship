const Ship = ((length) => ({
  length,
  position: null,
  hits: 0,
  hit() {
    this.isSunk() ? undefined : this.hits += 1;
  },
  isSunk() {
    return this.hits >= this.length;
  }
}));

module.exports = Ship;