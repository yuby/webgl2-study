const ATTR_POSITION_NAME = 'a_position';
const ATTR_POSITION_LOC = 0;
const ATTR_NORMAL_NAME = 'a_normal';
const ATTR_NORMAL_LOC = 1;
const ATTR_UV_NAME = 'a_uv';
const ATTR_UV_LOC = 2;


class GL {
  constructor(id) {
    this.canvas = document.getElementById(id);

    const ctx = this.canvas.getContext('webgl2');

    if (!ctx) throw new Error('No webgl2 context');

    this.gl = ctx;
  }
  clearColor() {
    this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
  }

  clear() {
    const { gl } = this;

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  setSize(w, h) {
    const { gl } = this;

    gl.canvas.style.width = `${w}px`;
    gl.canvas.style.height = `${h}px`;
    gl.canvas.width = w;
    gl.canvas.height = h;

    gl.viewport(0, 0, w, h);
  }

  getGL() {
    return this.gl;
  }

  createArrayBuffer(aryBuf, isStatic = true) {
    const { gl } = this;
    const bufVerts = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, bufVerts);
    gl.bufferData(gl.ARRAY_BUFFER, aryBuf, isStatic ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return bufVerts;
  }
}

class VAO {
  constructor(type = 'TRIANGLES', gl, arrIndex = null, arrVertx = null, arrNorm = null, arrUV = null, isStatic = true) {
    const _vao = gl.createVertexArray();

    gl.bindVertexArray(_vao);

    this.gl = gl;
    this.drawMode = gl[type];
    this.vao = _vao;
    this.isStatic = isStatic;
    this.EACH_VERT_COUNT = 3;
    this.EACH_UV_COUNT = 2;

    this.vertex = null;
    this.normal = null;
    this.uv = null;
    this.vertexIndex = null;
    this._setVertices(arrVertx);
    this._setNormal(arrNorm);
    this._setUV(arrUV);
    this._setVertexIndex(arrIndex);

    this.gl.bindVertexArray(null);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  }

  _setVertices(arrVertx) {
    if (!arrVertx) return;
    const { gl, EACH_VERT_COUNT } = this;

    this.vertex = {
      data: new Float32Array(arrVertx),
      buffer: gl.createBuffer(),
      length: arrVertx.length / EACH_VERT_COUNT,
      vertexEach: EACH_VERT_COUNT,
    };

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.vertex.data, (this.isStatic ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW));
    gl.enableVertexAttribArray(ATTR_POSITION_LOC);
    gl.vertexAttribPointer(ATTR_POSITION_LOC, EACH_VERT_COUNT, gl.FLOAT, false, 0, 0);
  }

  _setNormal(arrNorm) {
    if (!arrNorm) return;
    const { gl, EACH_VERT_COUNT } = this;

    this.normal = {
      data: new Float32Array(arrNorm),
      buffer: gl.createBuffer(),
    };

    this.bindBuffer(gl.ARRAY_BUFFER, this.normal.buffer);
    this.bufferData(gl.ARRAY_BUFFER, this.normal.data, (this.isStatic ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW));
    gl.enableVertexAttribArray(ATTR_NORMAL_LOC);
    gl.vertexAttribPointer(ATTR_NORMAL_LOC, EACH_VERT_COUNT, gl.FLOAT, false, 0, 0);
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