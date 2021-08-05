#version 300 es
precision mediump float;

out vec4 finalColor;
in vec3 color;

void main(void) {
  finalColor = vec4(color, 1.0);
}