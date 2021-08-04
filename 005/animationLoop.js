class AnimationLoop {
  constructor(callback) {
    this.msLastFrame = null;
    this.callback = callback;
    this.isActive = false;
    this.fps = 0;
  }

  loop() {
    const msCurrent = performance.now();
    const deltaTime = (msCurrent - this.msLastFrame) / 1000;

    this.fps = Math.floor(1/deltaTime);
    this.msLastFrame = msCurrent;
    this.callback(deltaTime);
    if (this.isActive) window.requestAnimationFrame(this.loop.bind(this));
  }

  start() {
    this.isActive = true;
    this.msLastFrame = performance.now();

    if (this.isActive) window.requestAnimationFrame(this.loop.bind(this))
  }
}