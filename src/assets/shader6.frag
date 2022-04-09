#ifdef GL_ES
precision mediump float;
#endif

uniform int iFrame;
uniform vec2 iResolution;
uniform float controller1;
uniform float controller2;
uniform float controller3;
uniform float controller4;

float noise(vec2 p) {
  float n = p.x * 14.0 + p.y * 3.0;
  return sin(n);
}

void main(void) {

  float time = float(iFrame) * 0.004 - 0.15;
  vec2 uv = (gl_FragCoord.xy / max(iResolution.x, iResolution.y) - 1.0) * 2.0;

  vec2 p = uv;

  for (int i = 1; i < 5; i++) {
    vec2 newp = p + time;
    newp.x += (float(i) * 0.1) * noise(p.xy);
    newp.y += (float(i) * 0.1) * noise(p.yx);
    p = mix(p, newp, 0.5);
  }
  vec3 col = vec3(fract(p.x * 2.0), fract(p.y * 2.0), fract(p.x + p.y));
  gl_FragColor = vec4(col, 1.0);
}