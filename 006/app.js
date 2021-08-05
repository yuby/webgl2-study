const run = async () => {
  const app = new GL({
    canvas: 'glcanvas',
    width: 500,
    height: 500,
  });
  const { gl } = app;

  const gridModel = await grid(gl);

  const onRender = (dt) => {
    gridModel.activate();
    gridModel.render();
  }

  const loop = new AnimationLoop(onRender);

  loop.start();
}

run();