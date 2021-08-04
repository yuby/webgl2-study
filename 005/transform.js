class Transform {
  constructor() {
    this.position = new Vector3(0, 0, 0);
    this.scale = new Vector3(1, 1, 1);
    this.rotation = new Vector3(1, 1, 1);
    this.matView = new Matrix4();
    this.matNormal = new Float32Array(9);

    this.forward = new Float32Array(4);
    this.up = new Float32Array(4);
    this.right = new Float32Array(4);
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

  updateMatrix() {
    this.matView
      .reset()
      .vtranslate(this.position)
      .rotateX(this.rotation.x * Transform.deg2Rad)
      .rotateZ(this.rotation.z * Transform.deg2Rad)
      .rotateY(this.rotation.y * Transform.deg2Rad)
      .vscale(this.scale);

    Matrix4.normalMat3(this.matNormal, this.matView.raw);

    Matrix4.transformVec4(this.forward, [0, 0, 1, 0], this.matView.raw);
    Matrix4.transformVec4(this.up, [0, 1, 0, 0], this.matView.raw);
    Matrix4.transformVec4(this.right, [1, 0, 0, 0], this.matView.raw);

    return this;
  }

  updateDirection() {
    Matrix4.transformVec4(this.forward, [0, 0, 1, 0], this.matView.raw);
    Matrix4.transformVec4(this.up, [0, 1, 0, 0], this.matView.raw);
    Matrix4.transformVec4(this.right, [1, 0, 0, 0], this.matView.raw);

    return this;
  }

  getViewMatrix() { return this.matView.raw; }
  getNormalMatrix() { return this.matNormal; }

  reset() {
    this.position.set(0, 0, 0);
    this.scale.set(1, 1, 1);
    this.rotation.set(0, 0, 0);
  }
}

Transform.deg2Rad = Math.PI / 180;
