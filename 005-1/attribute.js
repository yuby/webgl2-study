class Attribute {
  constructor(
    data,
    numOfComponent = 3,
    dataType = 'FLOAT',
    normalize = false,
    isStatic = true
  ) {
    this.data = data;
    this.buffer = null;
    this.location = null;
    this.isStatic = isStatic;
    this.numOfComponent = numOfComponent;
    this.vertexCount = data.length / numOfComponent;
    this.dataType = dataType;
    this.normalize = normalize;
  }

  initBuffer(name, gl, program) {
    this.buffer = gl.createBuffer();
    this.location = gl.getAttribLocation(program, name);
    const {
      numOfComponent, buffer, data, isStatic,
      location, dataType, normalize
    } = this;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, (isStatic ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW));

    return {
      buffer,
      location,
      numOfComponent,
      dataType,
      normalize,
    }
  }
}