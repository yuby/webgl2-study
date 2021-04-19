#version 300 es
precision mediump float;

in float size;
out vec4 finalColor;

void main(void) {
  float opacity = (40.0 - size) / 20.0;

  finalColor = vec4(0.0, 0.0, 0.0, opacity);
}