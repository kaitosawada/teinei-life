#ifdef GL_ES
precision mediump float;
#endif

uniform int iFrame;
uniform vec2 iResolution;
uniform float ctrl1;
uniform float ctrl2;
uniform float ctrl3;
uniform float ctrl4;
uniform float ctrl5;

float noise(vec2 p) {
  float n = p.x * (ctrl2 - 10.0) + p.y * (ctrl3 - 10.0) + 1.0;
  return mix(sin(fract(n * 3.14)), sin(n), ctrl4 / 10.0);
}

vec3 color(vec2 p) {
  return vec3(fract(p.x * 2.0), fract(p.y * 1.5), fract(p.x + p.y) * 0.8 + 0.2);
}

void main(void) {

  float time = float(iFrame) * 0.004 - 0.15;
  vec2 uv = (gl_FragCoord.xy / max(iResolution.x, iResolution.y) - 1.0) * 2.0 * ctrl5;

  vec2 p = uv;

  for (int i = 1; i < 6; i++) {
    vec2 newp = p - time * (ctrl1 - 30.0);
    newp.x += (float(i) * 0.1) * noise(p.xy);
    newp.y += (float(i) * 0.1) * noise(p.yx);
    p = mix(p, newp, 0.5);
  }
  gl_FragColor = vec4(color(p), 1.0);
}