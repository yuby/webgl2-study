#version 300 es
in vec3 a_position;
in float a_color;

uniform vec3 u_lineColor[3];
uniform mat4 u_mvMatrix;

out vec3 color;

void main(void){
  color = vec3(u_lineColor[int(a_color)]);
  gl_Position = u_mvMatrix * vec4(a_position, 1.0);
}