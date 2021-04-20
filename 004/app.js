const grid = () => {
  var verts = [],
			size = 1.8,
			div = 10.0,
			step = size / div,
			half = size / 2;

		var p;
		for(var i=0; i <= div; i++){
			//Vertical line
			p = -half + (i * step);
			verts.push(p);		//x1
			verts.push(half);	//y1
			verts.push(0);		//z1

			verts.push(p);		//x2
			verts.push(-half);	//y2
			verts.push(0);		//z2

			//Horizontal line
			p = half - (i * step);
			verts.push(-half);	//x1
			verts.push(p);		//y1
			verts.push(0);		//z1

			verts.push(half);	//x2
			verts.push(p);		//y2
			verts.push(0);		//z2
		}

    return verts;
}
const run = async () => {
  const glInstance = new GL('glcanvas');
  const gl = glInstance.getGL();

  glInstance.clearColor();
  glInstance.setSize(500, 500);
  glInstance.clear();

  const vShaderText = await ShaderUtil.shaderLoader('./vertex.vert');
  const fShaderText = await ShaderUtil.shaderLoader('./fragment.frag');

  const testShader = new Shader(gl, vShaderText, fShaderText);

  testShader.bindUniform('uColor', {
    type: 'uniform3fv',
    data: [0.8,0.8,0.8, 1,0,0, 0,1,0, 0,0,1],
  });

  const meshVAO = new VAO({
    type: 'LINES',
    gl,
    arrIndex: null,
    vertices: {
      data: grid(),
      count: 3,
    },
    arrNorm: null,
    arrUV: null,
    isStatic: true,
  });

  const onRender = (delta) => {
    glInstance.clear();

    testShader.activate();
    testShader.render(meshVAO);
  }

  const loop = new RenderLoop(onRender);

  loop.start();
}

run();