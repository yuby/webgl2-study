const gridData = () => {
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
const grid = async (gl) => {
  const vShaderText = await ShaderUtil.shaderLoader('./vertex.vert');
  const fShaderText = await ShaderUtil.shaderLoader('./fragment.frag');

  const positionAttr = new Attribute(new Float32Array(gridData().positions), 3);
  const colorAttr = new Attribute(new Float32Array(gridData().color), 1);
  const transformMat = new Transform();
  const mvUniform = new Uniform('uniformMatrix4fv', transformMat.updateMatrix().getViewMatrix(), false);

  const colorUniform = new Uniform('uniform3fv', [
    0.8, 0.8, 0.8,
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

  return model;
}