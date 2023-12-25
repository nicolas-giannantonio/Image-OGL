import { Plane } from "ogl";
import Canvas from "./Canvas";
import OGLImage from "./OGLImage";
/**
 * WebGL Experience
 *
 * @class
 * @implements {IExperience} @see {@link IExperience}
 * @param {object} [options] - Optional options to configure the experience.
 *
 * @param {HTMLElement} [options.container=document.body] - Container element where the canvas will be appended.
 * @param {boolean} [options.alpha=true]
 * @param {boolean} [options.antialias=true]
 * @param {number} [options.dpr=Math.min(window.devicePixelRatio, 2)]
 * @param {object} [options.scroll] - Object for tracking scroll position.
 * @param {boolean|number} [options.scroll.current=false] - Default window scroll. Set your own value to override.
 */
export default class Experience {
    constructor({ container = document.body, alpha = true, antialias = true, dpr = Math.min(window.devicePixelRatio, 2), scroll = { current: false }, } = {}) {
        this.scroll = scroll;
        this.container = container;
        this.alpha = alpha;
        this.antialias = antialias;
        this.dpr = dpr;
        this.canvas = new Canvas({
            container: this.container,
            alpha: this.alpha,
            antialias: this.antialias,
            dpr: this.dpr,
        });
        this.geometry = { plane: new Plane(this.canvas.gl) };
        this.userData = {
            webglImages: [],
            scroll: {
                current: 0,
            }
        };
        this.addEvents();
    }
    update() {
        this.canvas.update();
        this.userData.webglImages.forEach((webglImage) => {
            webglImage.update(this.userData.scroll.current);
        });
        window.requestAnimationFrame(this.update.bind(this));
    }
    resize() {
        this.canvas.resize();
        this.userData.webglImages.forEach((webglImage) => {
            webglImage.resize({
                screen: this.canvas.screen,
                viewport: this.canvas.webglViewport
            });
        });
    }
    onScroll() {
        if (typeof this.scroll.current === "number") {
            this.userData.scroll.current = (this.userData.scroll.current / window.innerHeight) * this.canvas.webglViewport.height * (window.innerHeight / this.canvas.webglViewport.height);
        }
        else {
            // Normalize scroll with webgl
            this.userData.scroll.current = (window.scrollY / window.innerHeight) * this.canvas.webglViewport.height * (window.innerHeight / this.canvas.webglViewport.height);
        }
    }
    addEvents() {
        window.addEventListener('resize', this.resize.bind(this));
        window.addEventListener('scroll', this.onScroll.bind(this));
        window.requestAnimationFrame(this.update.bind(this));
    }
    /**
     * Transform an image into a WebGL texture
     * @param image HTMLImageElement
     * @param options @see AddImageOptions
     */
    addImage(image, options) {
        if (image === null) {
            console.error(`Image not found ${image}`);
            return;
        }
        const defaultVertex = /* glsl */ `
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
        const defaultFragment = /* glsl */ `
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
        const webglImage = new OGLImage({
            image: image,
            canvas: this.canvas,
            geometry: this.geometry.plane,
            // USER DATA
            shaders: {
                vertex: (options === null || options === void 0 ? void 0 : options.vertex) || defaultVertex,
                fragment: (options === null || options === void 0 ? void 0 : options.fragment) || defaultFragment
            },
            uniforms: options === null || options === void 0 ? void 0 : options.uniforms,
            onUpdate: options === null || options === void 0 ? void 0 : options.onUpdate
        });
        this.userData.webglImages.push(webglImage);
    }
}
