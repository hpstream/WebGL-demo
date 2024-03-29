export class Vector2D extends Array {
  constructor(...args: number[]) {
    super(...args);
  }

  set x(v) {
    this[0] = v;
  }

  set y(v) {
    this[1] = v;
  }

  get x() {
    return this[0];
  }

  get y() {
    return this[1];
  }

  get length() {
    return Math.hypot(this.x, this.y);
  }

  get dir() {
    return Math.atan2(this.y, this.x);
  }

  copy() {
    return new Vector2D(this.x, this.y);
  }

  scale(a: number) {
    this.x *= a;
    this.y *= a;
    return this;
  }
  rotate(rad: number) {
    const c = Math.cos(rad),
      s = Math.sin(rad);
    const [x, y] = this;
    this.x = x * c + y * -s;
    this.y = x * s + y * c;
    return this;
  }
}
