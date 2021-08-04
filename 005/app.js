const grid = () => {
  const verts = [];
  const colorIndex = [];
  const size = 1.8;
  const div = 10.0;
  const step = size / div;
  const half = size / 2;

  let p;
  for(var i=0; i <= div; i++){
    //Vertical line
    p = -half + (i * step);
    verts.push(p);		//x1
    verts.push(half);	//y1
    verts.push(0);		//z1
    colorIndex.push(0);

    verts.push(p);		//x2
    verts.push(-half);	//y2
    verts.push(0);		//z2
    colorIndex.push(1);

    //Horizontal line
    p = half - (i * step);
    verts.push(-half);	//x1
    verts.push(p);		//y1
    verts.push(0);		//z1
    colorIndex.push(2);

    verts.push(half);	//x2
    verts.push(p);		//y2
    verts.push(0);		//z2
    colorIndex.push(0);
  }

  return {
    positions: verts,
    color: colorIndex,
  }
}
const run = async () => {
  const app = new GL({
    canvas: 'glcanvas',
    width: 500,
    height: 500,
  });
  const { gl } = app;

  const vShaderText = await ShaderUtil.shaderLoader('./vertex.vert');
  const fShaderText = await ShaderUtil.shaderLoader('./fragment.frag');

  const positionAttr = new Attribute(new Float32Array(grid().positions), 3);
  const colorAttr = new Attribute(new Float32Array(grid().color), 1);

  const transformMat = new Transform();
  const mvUniform = new Uniform('uniformMatrix4fv', transformMat.updateMatrix().getViewMatrix(), false);

  const colorUniform = new Uniform('uniform3fv', [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1,
  ]);

  const model = new Shader({
    gl,
    vs: vShaderText,
    fs: fShaderText,
    attributes: {
      a_position: positionAttr,
      a_color: colorAttr,
    },
    uniforms: {
      u_lineColor: colorUniform,
      u_mvMatrix: mvUniform,
    },
    vertexCount: positionAttr.vertexCount,
    primitiveType: 'LINES',
  });

  let colorStep = 1;
  let color = 0;

  const onRender = (dt) => {
    color = Math.sin(color += colorStep * dt );

    colorUniform.update(gl, [
      color, 0, 0,
      0, color, 0,
      0, 0, color,
    ]);

    const position = transformMat.getPosition();
		const	angle = Math.atan2(position.y, position.x)  + (1 * dt);
    const radius = Math.sqrt(position.x * position.x + position.y * position.y);

    // console.log(Math.abs(Math.sin(dt)) * 1.2)
    const	scale = Math.max(0.2,  Math.abs(Math.sin(dt)) * 1.2);

    transformMat
      // .setScale(scale, scale/4, 1)
      .setPosition(radius * Math.cos(angle), radius * Math.sin(angle), 0)
      .addRotation(30 * dt, 60 * dt, 15 * dt)
      .updateMatrix();

    mvUniform.update(gl, transformMat.getViewMatrix());


    model.activate();
    model.render();
  }

  const loop = new AnimationLoop(onRender);

  loop.start();
}

run();