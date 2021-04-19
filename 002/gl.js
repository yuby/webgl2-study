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