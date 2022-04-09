#ifdef GL_ES
precision mediump float;
#endif

uniform int iFrame;
uniform vec2 iResolution;
uniform float controller1;
uniform float controller2;
uniform float controller3;
uniform float controller4;

const float PI = 3.14159265;
const float angle = 45.0;
const float fov = angle * 0.5 * PI / 180.0;

const float rep = 4.0;
// const float sphereSize = 1.0;
const vec3 lightDir = vec3(-0.577, 0.577, 0.577);

vec3 trans(vec3 p) { return mod(p, rep) - rep / 2.0; }

float smoothMin(float d1, float d2, float k){
    float h = exp(-k * d1) + exp(-k * d2);
    return -log(h) / k;
}

vec3 twist(vec3 p, float power){
    float s = sin(power);
    float c = cos(power);
    mat3 m = mat3(
          c, 0.0,   s,
        0.0, 1.0, 0.0,
         -s, 0.0,   c
    );
    return m * p;
}

vec3 hsv (float h, float s, float v) {
  return ((clamp(abs(fract(h+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*s+1.)*v;
}

float distFuncSquare(vec3 p, vec3 size) {
  vec3 q = abs(trans(p));
  return length(max(q - size, 0.0)) - 0.1;
}

float distanceFunc(vec3 p, float time) {
  float sphere1 = length(trans(p - vec3(0.0, sin(time * 0.75) * 1.0, 0.0))) - 0.5;
  float sphere2 = distFuncSquare(p, vec3(4.0, 0.2, 4.0));

  return smoothMin(sphere1, sphere2, 2.0);
}

vec3 getNormal(vec3 p, float time) {
  float d = 0.001;
  return normalize(vec3(distanceFunc(p + vec3(d, 0.0, 0.0), time) -
                            distanceFunc(p + vec3(-d, 0.0, 0.0), time),
                        distanceFunc(p + vec3(0.0, d, 0.0), time) -
                            distanceFunc(p + vec3(0.0, -d, 0.0), time),
                        distanceFunc(p + vec3(0.0, 0.0, d), time) -
                            distanceFunc(p + vec3(0.0, 0.0, -d), time)));
}

vec3 getColor(vec3 p, float time, vec3 cPos) {
  vec3 normal = getNormal(p, time);
  float diff = clamp(dot(lightDir, normal), 0.1, 1.0);
  float light = diff * 0.5 + 0.5;
  float dist = distance(p, cPos);
  light = clamp(mix(light, 1.0 - 3.0 / dist, 0.5), 0.1, 1.0);
  return hsv(fract(dist * 0.1), light, 0.8);
}

void main(void) {

  float time = float(iFrame) * 0.04 - 0.15;
  vec2 uv = (gl_FragCoord.xy / max(iResolution.x, iResolution.y) - 1.0) * 2.0;

  vec3 cPos = vec3(time, 0.0, 2.0 * sin(time * 0.1));
  vec3 ray = normalize(vec3(sin(fov) * uv.x, sin(fov) * uv.y, -cos(fov)));
  ray = twist(ray, time * 0.1);

  float dist = 0.0;
  float rayLength = 0.0;
  for (int i = 0; i < 128; i++) {
    vec3 rPos = cPos + ray * rayLength;
    if (distance(rPos, cPos) > 2.0) {
      dist = distanceFunc(rPos, time);
      rayLength += dist;
    } else {
      rayLength += 1.0;
    }
  }

  if (abs(dist) < 0.0001) {
    vec3 rPos = cPos + ray * rayLength;
    gl_FragColor = vec4(getColor(rPos, time, cPos), 1.0);
  } else {
    gl_FragColor = vec4(vec3(0.1), 1.0);
  }
}