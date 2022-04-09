#ifdef GL_ES
precision mediump float;
#endif

uniform int iFrame;
uniform vec2 iResolution;

float noise(vec2 p) {
  float n = p.x * 12.0 + p.y * (12.0 * 0.5 + 2.0);
  return sin(n);
}

void main(void) {

  float time = float(iFrame) * 0.004 - 0.15;
  vec2 uv = (gl_FragCoord.xy / max(iResolution.x, iResolution.y) - 1.0) * 2.0;

  float a = atan(uv.x, uv.y);
  float r = length(uv) * 2.0;
  vec2 p = vec2(a, r);

  for (int i = 1; i < 5; i++) {
    vec2 newp = p + time;
    newp.x += (float(i) * 0.1 + sin(time - 0.1)) * noise(p.xy);
    newp.y += (float(i) * 0.1 + sin(time - 0.1)) * noise(p.yx);
    p = mix(p, newp, 0.5);
  }
  vec3 col =
      vec3(0.5 * sin(p.x), 0.4 * sin(p.y), 0.4 * sin(p.x + p.y + 1.5)) + 0.5;
  gl_FragColor = vec4(col, 1.0);
}