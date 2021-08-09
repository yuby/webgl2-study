class Transform {
  constructor() {
    this.position = new Vector3(0, 0, 0);
    this.scale = new Vector3(1, 1, 1);
    this.rotation = new Vector3(1, 1, 1);
    this.matView = new Matrix4();
    this.ortho = null;
  }

  setScale(x, y, z) {
    this.scale.set(x, y, z);
    return this;
  }
  getScale() {
    return this.scale;
  }
  addScale(x, y, z) {
    this.scale.x += x;
    this.scale.y += y;
    this.scale.z += z;
    return this;
  }
  setRotation(x, y, z) {
    this.rotation.set(x, y, z);
    return this;
  }
  getRotation() {
    return this.rotation;
  }
  addRotation(x, y, z) {
    this.rotation.x += x;
    this.rotation.y += y;
    this.rotation.z += z;
    return this;
  }
  setPosition(x, y, z) {
    this.position.set(x, y, z);
    return this;
  }
  getPosition() {
    return this.position;
  }
  addPosition(x, y, z) {
    this.position.x += x;
    this.position.y += y;
    this.position.z += z;
    return this;
  }

  orthographic(l, r, b, t, n, f) {
    if (!this.ortho) {
      this.ortho = {
        left: l,
        right: r,
        bottom: b,
        top: t,
        near: n,
        far: f,
      }
    }
    const {
      left,
      right,
      bottom,
      top,
      near,
      far,
    } = this.ortho;

    this.matView.reset();
    Matrix4.ortho(this.matView.raw, left, right, bottom, top, near, far);

    return this;
  }

  updateMatrix() {
    if (this.ortho) this.orthographic();

    this.matView
      .vtranslate(this.position)
      .rotateX(Transform.deg2Rad(this.rotation.x))
      .rotateZ(Transform.deg2Rad(this.rotation.z))
      .rotateY(Transform.deg2Rad(this.rotation.y))
      .vscale(this.scale);

    return this;
  }

  getViewMatrix() {
    return this.matView.raw;
  }

  reset() {
    this.position.set(0, 0, 0);
    this.scale.set(1, 1, 1);
    this.rotation.set(0, 0, 0);
  }
}

Transform.deg2Rad = (d) => d * Math.PI / 180;
// Transform.deg2RadFn = (d) => d * Math.PI / 180;
