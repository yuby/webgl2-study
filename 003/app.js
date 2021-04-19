
class TestShader extends Shader {
  constructor(gl, vShaderText, fShaderText) {
    super(gl, vShaderText, fShaderText);

    this.uniformLoc.uPointSize = gl.getUniformLocation(this.program, 'uPointSize');
    this.uniformLoc.uAngle = gl.getUniformLocation(this.program, 'uAngle');

    gl.useProgram(null);
  }

  setPointSize(size) {
    this.gl.uniform1f(this.uniformLoc.uPointSize, size);
  }

  setAngle(angle) {
    this.gl.uniform1f(this.uniformLoc.uAngle, angle);
  }
}

const run = async () => {
  const glInstance = new GL('glcanvas');
  const gl = glInstance.getGL();

  glInstance.clearColor();
  glInstance.setSize(500, 500);
  glInstance.clear();

  const vShaderText = await ShaderUtil.shaderLoader('./vertex.vert');
  const fShaderText = await ShaderUtil.shaderLoader('./fragment.frag');

  const testShader = new TestShader(gl, vShaderText, fShaderText);

  const meshVAO = new VAO(
    'POINTS',
    gl,
    null,
    [0,0,0, 0.1,0.1,0, 0.1,-0.1,0, -0.1,-0.1,0, -0.1,0.1,0],
    null,
    null,
    true,
  );

  let pointSize = 0;
  let angle = 0;
  const angleStep = (Math.PI / 180) * 90;
  const pointSizeStep = 3;
  const onRender = (delta) => {
    pointSize += pointSizeStep * delta;
    angle += angleStep * delta;

    const size = (Math.sin(pointSize) * 10.0) + 30.0;

    glInstance.clear();

    testShader.activate();
    testShader.setAngle(angle);
    testShader.setPointSize(size);

    testShader.render(meshVAO);
  }

  const loop = new RenderLoop(onRender);

  loop.start();
}

run();