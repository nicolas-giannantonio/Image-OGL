import './style.css'

const vertex = /* glsl */ `
                #define PI 3.1415926535897932384626433832795
 
                precision highp float;
                precision highp int;
                 
                attribute vec3 position;
                attribute vec2 uv;
                 
                uniform mat4 modelViewMatrix;
                uniform mat4 projectionMatrix;
                 
                uniform float uStrength;
                uniform vec2 uViewportSizes;
                uniform float uTime;
                 
                varying vec2 vUv;
                 
                void main() {
                  vec4 newPosition = modelViewMatrix * vec4(position, 1.0);
                 
                    // newPosition.x += sin(newPosition.y / uViewportSizes.y * PI + PI + uTime + 200.0) * -.5;
                               
                  vUv = uv;
                  gl_Position = projectionMatrix * newPosition;
                }
            `;
const fragment = /* glsl */ `
                precision highp float;
 
                uniform vec2 uImageSizes;
                uniform vec2 uPlaneSizes;
                uniform sampler2D tMap;
                 
                varying vec2 vUv;
                 
                void main() {
                  vec2 ratio = vec2(
                    min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
                    min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
                  );
                 
                  vec2 uv = vec2(
                    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
                    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
                  );
                 
                  gl_FragColor.rgb = texture2D(tMap, uv).rgb;
                  gl_FragColor.a = 1.0;
                }
            `;


import Experience from "./lib/Experience";

const experience = new Experience()

const image = document.querySelector('img');

experience.addImage(image, {
    vertex: vertex,
    fragment: fragment
})

