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
  const app = new GL({
    canvas: 'glcanvas',
    width: 500,
    height: 500,
  });
  const { gl } = app;

  const vShaderText = await ShaderUtil.shaderLoader('./vertex.vert');
  const fShaderText = await ShaderUtil.shaderLoader('./fragment.frag');

  const positionBuffer = new Buffer(new Float32Array(grid()), 3)
  const model = new Shader({
    gl,
    vs: vShaderText,
    fs: fShaderText,
    attributes: {
      a_position: positionBuffer,
    },
    uniforms: {},
    vertexCount: positionBuffer.vertexCount,
    primitiveType: 'LINES',
  });

  const onRender = (delta) => {
    model.activate();
    model.render();
  }

  const loop = new AnimationLoop(onRender);

  loop.start();
}

run();