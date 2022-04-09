#ifdef GL_ES
precision mediump float;
#endif

uniform int iFrame;
uniform vec2 iResolution;
// uniform float controller1;
// uniform float controller2;
// uniform float controller3;
// uniform float controller4;

// grab texcoords from vert shader
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;

const float dx = 0.01;
const float du = 0.00005;
const float dv = 0.00001;

float rand(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 get(float x, float y) {
  return texture2D(tex0, (vTexCoord.xy + (vec2(x, y)) / iResolution / 2.1)).xyz;
}

void main(void) {
  float time = float(iFrame);
  vec2 uv =
      ((gl_FragCoord.xy - iResolution) / max(iResolution.x, iResolution.y)) *
      2.0;

  if (time * 0.01 < 0.1) {
    // vec4 tex = texture2D(tex0, 1.0 - vTexCoord);
    // gl_FragColor = vec4(vTexCoord.x, vTexCoord.y, 1.0, 1.0);
    float color = rand(uv);
    gl_FragColor = vec4(vec3(color), 1.0);
  } else {
    vec3 c = get(0.0, 0.0);
    vec3 laplacian = vec3(0.0, 0.0, 0.0);
    laplacian += get(-1.0, 0.0) - c;
    laplacian += get(1.0, 0.0) - c;
    laplacian += get(0.0, -1.0) - c;
    laplacian += get(0.0, 1.0) - c;
    // laplacian /= dx * dx;
    // float f = controller1 * 0.0001;
    // float k = controller2 * 0.01;
    // float duv = controller3 * 0.01;
    float f = 0.0001;
    float k = 0.01;
    float duv = 0.01;
    float color = rand(uv);
    float reaction = c.x * c.y * c.y;
    float partial_u = duv * laplacian.x - reaction + f * (1.0 - c.x);
    float partial_v = duv * laplacian.y + reaction - c.y * (f + k);
    gl_FragColor = clamp(vec4(c.x + partial_u * 2.0 + color * 0.1, c.y + partial_v * 2.0 + color * 0.1, 0.5, 1.0), 0.0, 1.0);
  }
}