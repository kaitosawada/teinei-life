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
  vec2 uv = (gl_FragCoord.xy / min(iResolution.x, iResolution.y) - 1.0) * 0.2;

  float color = 0.0 / gl_FragCoord.x;
  color +=
      cos(uv.x / cos(time / 15.0) * 80.0) + cos(uv.y * sin(time / 15.0) * 10.0);
  color +=
      sin(uv.y / sin(time / 10.0) * 40.0) / cos(uv.x * sin(time / 25.0) * 40.0);
  color +=
      sin(uv.x * sin(time / 5.0) * 10.0) - (uv.y * sin(time / 35.0) * 80.0);
  color *= sin(time - 10.0) * 0.01 / asin(uv.y - uv.x) * -5.0;

  gl_FragColor = vec4(color, color * 0.5, color, 1.0);
}