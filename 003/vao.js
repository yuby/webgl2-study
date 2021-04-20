class VAO {
  constructor(props) {
    const {
      type = 'TRIANGLES',
      gl,
      arrIndex = null,
      vertices = null,
      arrNorm = null,
      arrUV = null,
      isStatic = true
    } = props;

    const _vao = gl.createVertexArray();

    gl.bindVertexArray(_vao);

    this.gl = gl;
    this.drawMode = gl[type];
    this.vao = _vao;
    this.isStatic = isStatic;
    this.EACH_UV_COUNT = 2;

    this.vertex = null;
    this.normal = null;
    this.uv = null;
    this.vertexIndex = null;
    this._setVertices(vertices);
    this._setNormal(arrNorm);
    this._setUV(arrUV);
    this._setVertexIndex(arrIndex);

    this.gl.bindVertexArray(null);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  }

  _setVertices(vertexInfo) {
    if (!vertexInfo) return;
    const { gl } = this;
    const { data, count } = vertexInfo;

    this.vertex = {
      data: new Float32Array(data),
      buffer: gl.createBuffer(),
      length: data.length / count,
      vertexEach: count,
    };

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.vertex.data, (this.isStatic ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW));
    gl.enableVertexAttribArray(ATTR_POSITION_LOC);
    gl.vertexAttribPointer(ATTR_POSITION_LOC, count, gl.FLOAT, false, 0, 0);
  }

  _setNormal(arrNorm) {
    if (!arrNorm) return;
    const { gl } = this;
    const vertexCount = this.vertex.vertexEach;

    this.normal = {
      data: new Float32Array(arrNorm),
      buffer: gl.createBuffer(),
    };

    this.bindBuffer(gl.ARRAY_BUFFER, this.normal.buffer);
    this.bufferData(gl.ARRAY_BUFFER, this.normal.data, (this.isStatic ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW));
    gl.enableVertexAttribArray(ATTR_NORMAL_LOC);
    gl.vertexAttribPointer(ATTR_NORMAL_LOC, vertexCount, gl.FLOAT, false, 0, 0);
  }

  _setUV(arrUV) {
    if (!arrUV) return;
    const { gl, EACH_UV_COUNT } = this;

    this.uv = {
      buffer: gl.createBuffer(),
      data: new Float32Array(arrUV),
    }

    this.bindBuffer(gl.ARRAY_BUFFER, this.uv.buffer);
    this.bufferData(gl.ARRAY_BUFFER, this.uv.data, (this.isStatic ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW));
    gl.enableVertexAttribArray(ATTR_UV_LOC);
    gl.vertexAttribPointer(ATTR_UV_LOC, EACH_UV_COUNT, gl.FLOAT, false, 0, 0);
  }

  _setVertexIndex(arrIndex) {
    if (!arrIndex) return;
    const { gl } = this;

    this.vertexIndex = {
      buffer: gl.createBuffer(),
      data: new Uint16Array(arrIndex),
      length: arrUV.length,
    }

    this.bindBuffer(gl.ARRAY_BUFFER, this.vertexIndex.buffer);
    this.bufferData(gl.ARRAY_BUFFER, this.vertexIndex.data, gl.STATIC_DRAW);
    this.bindBuffer(gl.ARRAY_BUFFER, null);
  }
}