class Buffer {
  constructor(data, numOfComponent = 3,isStatic = true) {
    this.data = data;
    this.buffer = null;
    this.location = null;
    this.isStatic = isStatic;
    this.numOfComponent = numOfComponent;
    this.vertexCount = data.length / numOfComponent;
  }

  initBuffer(name, gl, program) {
    this.buffer = gl.createBuffer();
    this.location = gl.getAttribLocation(program, name);

    const { buffer, data, isStatic } = this;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, (isStatic ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW));
  }
}