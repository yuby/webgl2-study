#version 300 es
precision mediump float;

out vec4 finalColor;
uniform float uPointSize;

void main(void) {
  float opacity = (40.0 - uPointSize) / 20.0;

  finalColor = vec4(0.0, 0.0, 0.0, opacity);
}