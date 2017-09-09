class test {
  constructor (x, y) {
    this.z = 'z';
    this.x = x;
    this.y = y;
    this.l = 1;
  }
  _o () {
    console.log(this.x);
  }
  _q () {
    this.x = this.y;
  }
  _l () {
    setInterval(() => {
      console.log(this._l());
    }, 1000);
    return this.l += 1;
  }
  p () {
    this._o();
    this._q();
    /* this._l(); */
    console.log(this.x, this.y, this.z);
  }
}

export default test;