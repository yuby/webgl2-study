#version 300 es
in vec3 a_position;

uniform float uPointSize;
uniform float uAngle;

out float size;

void main(void){
  gl_PointSize = uPointSize;
  size = uPointSize;
  gl_Position = vec4(
    cos(uAngle) * 0.8 + a_position.x,
    sin(uAngle) * 0.8 + a_position.y,
    a_position.z,
    1.0
  );
}