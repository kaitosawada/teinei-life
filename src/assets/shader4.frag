#ifdef GL_ES
precision mediump float;
#endif

uniform int iFrame;
uniform float controller1;
uniform vec2 iResolution;

const int complexity = 10;
const float color_intensity = 0.5;

float noise(vec3 x) {
  vec3 p = fract(x) * 0.1;
  float n = p.x + p.y * 7.0 + 13.0 * p.z;
  return sin(n);
}

vec3 flow(vec3 p, float time, float i) {
  vec3 newp = p + time * 0.1;
  newp.x +=
      0.6 * sin(i * p.y + 0.3 * i + 0.1) + 0.5 + noise(p) + 0.1;
  newp.y += 0.6 * sin(i * p.z + 0.3 * i + 10.0 + 0.5) + 0.5 +
            noise(p) + 0.1;
  newp.z += 0.6 * sin(i * p.x + 0.3 * i + 20.0 + 10.0) + 0.5 +
            noise(p) + 0.1;
  return newp;
}

void main(void) {

  float time = float(iFrame) * 0.02;
  vec2 uv = (gl_FragCoord.xy / max(iResolution.x, iResolution.y) - 0.8) * 2.0;
  vec3 p = vec3(uv.x, uv.y, (uv.x + uv.y) / 2.0);

  for (int i = 1; i < complexity; i++) {
    p = flow(p, time, float(i));
  }
  vec3 col =
      vec3(color_intensity * sin(p.x) + 0.5, color_intensity * sin(p.y) + 0.5,
           color_intensity * sin(p.z) + 0.5);
  gl_FragColor = vec4(col, 1.0);
}