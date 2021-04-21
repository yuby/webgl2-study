class Shader {
  constructor(props) {
    const {
      gl,
      vs,
      fs,
      attributes,
      uniforms,
      vertexCount,
      primitiveType = 'POINTS'
    } = props;

    this.program = ShaderUtil.creatProgramFromSource(gl, vs, fs, true);
    this.gl = gl;
    this.attributes = attributes;
    this.uniforms = uniforms;
    this.vao = null;
    this.vertexCount = vertexCount;
    this.primitiveType = primitiveType;

    if (this.program !== null) {
      gl.useProgram(this.program);

      this._initAttribBuffer();
    }
  }

  _initAttribBuffer() {
    const { gl, program } = this;
    Object.keys(this.attributes).forEach((key) => {
      this.attributes[key].initBuffer(key, gl, program);
    })
  }

  activate() {
    const { gl, attributes } = this;

    gl.useProgram(this.program);

    this.vao = gl.createVertexArray();

    gl.bindVertexArray(this.vao);

    Object.keys(attributes).forEach((key) => {
      const { location, numOfComponent } = attributes[key];

      gl.vertexAttribPointer(
        location,
        numOfComponent,
        gl.FLOAT,
        false,
        0,
        0
      );
      gl.enableVertexAttribArray(location);
    })

  }

  deActivate() {
    this.gl.useProgram(null);
  }

  dispose() {
    if (this.gl.getParameter(this.gl.CURRENT_PROGRAM) === this.program) {
      this.gl.useProgram(null);
    }
    this.gl.deleteProgram(this.program);
  }

  preRender() {}

  render() {
    const { gl, primitiveType, vertexCount } = this;

    gl.drawArrays(gl[primitiveType], 0, vertexCount);
  }
}