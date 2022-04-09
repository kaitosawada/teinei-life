#ifdef GL_ES
precision mediump float;
#endif

uniform int iFrame;
uniform vec2 iMouse;
uniform vec2 iResolution;

float fn(float x) {
  float y = fract(x);
  y = abs(y);
  return 1.0 - exp(y * y);
}

void main(void) {

  float time = float(iFrame) * 0.02;
  vec2 uv = (gl_FragCoord.xy / min(iResolution.x, iResolution.y) - 1.0) * 8.0;
  
  
  uv.x -= 6.3;
  float a = atan(uv.y, uv.x);
  float r = length(uv) * 2.0;
  float i = abs(iResolution.x * iResolution.y / 2.0 -
                gl_FragCoord.y * iResolution.x + gl_FragCoord.x);

  // vec2 s = abs(cos(vec2(0.5, 0.5)));
  // float d = dot(s, s);
  // float f = fn(d + i);
  float o1 = fract(fn(r * r * 0.1) + time);
  float o2 = fract(fn(sin(a) * 8.0) + time);
  float o3 = fract(fn(r * r * 2.0) + time);
  vec3 color = mix(vec3(0.7, 0.5, 0.1), vec3(1.0, 0.1, 0.0), step(o1, o2));
  color = mix(color, vec3(0.0, 1.0, 1.0), o3 * o3);

  gl_FragColor = vec4(color, 1.0);
}