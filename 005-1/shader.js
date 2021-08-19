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
      this._initUniform();
      this._clearRef();
    }
  }

  _clearRef() {
    const { gl } = this;

    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  _initUniform() {
    const { gl, program } = this;

    Object.keys(this.uniforms).forEach((key) => {

      this.uniforms[key].initUniform(key, gl, program);
    })
  }

  _initAttribBuffer() {
    const { gl, program } = this;

    this.vao = gl.createVertexArray();

    gl.bindVertexArray(this.vao);

    Object.keys(this.attributes).forEach((key) => {
      const {
        location,
        numOfComponent,
        buffer,
        dataType,
        normalize
      } = this.attributes[key].initBuffer(key, gl, program);

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.vertexAttribPointer(
        location,
        numOfComponent,
        gl[dataType],
        normalize,
        0,
        0
      );
      gl.enableVertexAttribArray(location);
    });

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindVertexArray(null);
  }

  activate() {
    const { gl } = this;

    gl.useProgram(this.program);
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
    const { gl, primitiveType, vertexCount, vao } = this;

    gl.bindVertexArray(vao);
    gl.drawArrays(gl[primitiveType], 0, vertexCount);
    this._clearRef();
  }
}