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
// varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;

float noise(vec2 p) {
  float n = p.x * 14.0 + p.y * 3.0;
  return sin(n);
}


void main() {
  float time = float(iFrame) * 0.004 - 0.15;
  vec2 uv = (gl_FragCoord.xy / max(iResolution.x, iResolution.y) - 1.0) * 2.0;

  // vec4 tex = texture2D(tex0, 1.0 - vTexCoord);
  float gray = (tex.r + tex.g + tex.b) / 3.0;
  gray = floor(gray * 4.0) / 4.0;

  vec2 p = uv;

  for (int i = 1; i < 5; i++) {
    vec2 newp = p + time * gray;
    newp.x += (float(i) * gray * 0.1) * noise(p.xy);
    newp.y += (float(i) * gray * 0.1) * noise(p.yx);
    p = mix(p, newp, 0.5);
  }
  vec3 col = vec3(fract(p.x * 2.0), fract(p.y * 2.0), fract(p.x + p.y));
  gl_FragColor = vec4(col, 1.0);
}