const run = async () => {
  const app = new GL({
    canvas: 'glcanvas',
    width: 588,
    height: 351,
  });
  const { gl } = app;

  const vShaderText = await ShaderUtil.shaderLoader('./vertex.vert');
  const fShaderText = await ShaderUtil.shaderLoader('./fragment.frag');

  const interaction = new Interaction(gl.canvas);

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
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 1;
  const zFar = 2000;
  transformMat.perspective(
    60,
    aspect,
    zNear,
    zFar,
  );

  transformMat
    .setPosition(-150, 0, -360)
    .setRotation(190, 40, 30)
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

  interaction.on('drag', (e) => {
    const { movementX, movementY } = e;

    transformMat
    .addPosition(movementX, -movementY, 0)
    .updateMatrix();
    mvUniform.update(gl, transformMat.getViewMatrix());
  });

  interaction.on('wheel', (e) => {
    const { deltaY } = e;

    transformMat
    .addPosition(0, 0, -deltaY * 0.5)
    .updateMatrix();
    mvUniform.update(gl, transformMat.getViewMatrix());
  });

  const onRender = (dt) => {
    model.activate();
    model.render();
  }

  const loop = new AnimationLoop(onRender);

  loop.start();
}

run();