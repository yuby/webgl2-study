class Shader {
  constructor(gl, vShaderText, fShaderText, doValidate) {
    this.program = ShaderUtil.creatProgramFromSource(gl, vShaderText, fShaderText, doValidate);
    this.gl = gl;
    this.attribLoc = null;
    this.uniformLoc = null;

    if (this.program !== null) {
      gl.useProgram(this.program);
      this.attribLoc = ShaderUtil.getStandardAttribLocation(gl, this.program);
      this.uniformLoc = {};
    }
  }

  activate() {
    this.gl.useProgram(this.program);
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

  bindUniform(name, props) {
    this.activate();
    const { gl } = this;
    const uniformLoc = gl.getUniformLocation(this.program, name);

    Object.assign(this.uniformLoc, {
      [name]: uniformLoc,
    });

    if (props) {
      const { type, data } = props;

      gl[type](uniformLoc, data);
    }

    this.deActivate();
  }

  setUniform(name, data) {

  }

  getUniform(name) {
    return this.uniformLoc[name] | null;
  }

  preRender() {}

  render(features) {
    const { vao, vertexIndex, drawMode, vertex } = features;

    this.gl.bindVertexArray(vao);

    if (vertexIndex) {
      const { length: indexLength } = vertexIndex;
      this.gl.drawElements(drawMode, indexLength, gl.UNSIGNED_SHORT, 0);
    } else {
      const { length: vertexLength } = vertex;
      this.gl.drawArrays(drawMode, 0, vertexLength);
    }


    this.gl.bindVertexArray(null);
  }
}