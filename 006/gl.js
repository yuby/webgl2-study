class GL {
  constructor(props) {
    const { canvas, width, height } = props;
    this.canvas = document.getElementById(canvas);
    this.width = width;
    this.height = height;

    const ctx = this.canvas.getContext('webgl2');

    if (!ctx) throw new Error('No webgl2 context');

    this.gl = ctx;

    this.clearColor();
    this.setSize();
    this.clear();
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
    const width = w || this.width;
    const height = h || this.height;

    gl.canvas.style.width = `${width}px`;
    gl.canvas.style.height = `${height}px`;
    gl.canvas.width = width;
    gl.canvas.height = height;

    gl.viewport(0, 0, width, height);
  }
}
