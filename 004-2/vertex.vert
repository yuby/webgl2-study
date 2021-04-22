#version 300 es
in vec3 a_position;
in float a_color;

uniform vec3 u_lineColor[3];
uniform float u_angle;

out vec3 color;

void main(void){
  color = vec3(u_lineColor[int(a_color)]);
  gl_Position = vec4(
    cos(u_angle) * 0.8 + a_position.x,
    sin(u_angle) * 0.8 + a_position.y,
    a_position.z,
    1.0
  );
}