class Uniform {
  constructor(type, data, transpose) {
    this.data = data;
    this.type = type;
    this.transpose = transpose;
    this.location = null;
  }

  initUniform(name, gl, program) {
    this.location = gl.getUniformLocation(program, name);

    console.log(name, this.location)

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