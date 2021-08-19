const run = async () => {
  const app = new GL({
    canvas: 'glcanvas',
    width: 500,
    height: 500,
  });
  const { gl } = app;

  const vShaderText = await ShaderUtil.shaderLoader('./vertex.vert');
  const fShaderText = await ShaderUtil.shaderLoader('./fragment.frag');

  const positionAttr = new Attribute(
    fShape,
    3,
    'FLOAT',
    false,
  );
  const colorAttr = new Attribute(
    fShpaeColor,
    3,
    'UNSIGNED_BYTE',
    true,
  );

  const transformMat = new Transform();
  transformMat.orthographic(
    0,
    gl.canvas.clientWidth,
    gl.canvas.clientHeight,
    0,
    400,
    -400,
  );

  transformMat
    .setPosition(45, 150, 0)
    .setRotation(40, 25, 325)
    .setScale(1, 1, 1)
    .updateMatrix();

  const mvUniform = new Uniform('uniformMatrix4fv', transformMat.getViewMatrix(), false);

  const model = new Shader({
    gl,
    vs: vShaderText,
    fs: fShaderText,
    attributes: {
      a_position: positionAttr,
      a_color: colorAttr,
    },
    uniforms: {
      u_mv: mvUniform,
    },
    vertexCount: positionAttr.vertexCount,
    primitiveType: 'TRIANGLES',
  });

  const onRender = (dt) => {
    model.activate();
    model.render();
  }

  onRender();

  // const loop = new AnimationLoop(onRender);

  // loop.start();
}

run();