class Uniform {
  constructor(type, data) {
    this.data = data;
    this.type = type;
    this.location = null;
  }

  initUniform(name, gl, program) {
    this.location = gl.getUniformLocation(program, name);

    if (this.data) {
      this.update(gl, this.data);
    }
  }
  update(gl, data) {
    const { type, location } = this;

    gl[type](location, data);
  }
}