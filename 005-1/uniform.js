class Uniform {
  constructor(type, data, transpose) {
    this.data = data;
    this.type = type;
    this.transpose = transpose;
    this.location = null;
    this.name = null;
  }

  initUniform(name, gl, program) {
    this.name = name;
    this.location = gl.getUniformLocation(program, name);

    if (this.data) {
      this.update(gl, this.data);
    }
  }
  update(gl, data) {
    const { type, location, transpose = false } = this;

    if (type.includes('Matrix')) {
      gl[type](location, transpose, data);
    } else {
      gl[type](location, data);
    }
  }
}