import { Camera, Renderer, Transform } from "ogl";
export default class Canvas {
    constructor({ container = document.body, alpha = true, antialias = true, dpr = Math.min(window.devicePixelRatio, 2), } = {}) {
        this.container = container;
        this.alpha = alpha;
        this.antialias = antialias;
        this.dpr = dpr;
        this.createRenderer();
        this.createCamera();
        this.createScene();
        this.resize();
    }
    createRenderer() {
        this.renderer = new Renderer({
            dpr: this.dpr,
            antialias: this.antialias,
            alpha: this.alpha,
        });
        this.gl = this.renderer.gl;
        this.container.appendChild(this.gl.canvas);
    }
    createCamera() {
        this.camera = new Camera(this.gl);
        this.camera.position.z = 5;
    }
    createScene() {
        this.scene = new Transform();
    }
    resize() {
        this.screen = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.perspective({
            aspect: this.gl.canvas.width / this.gl.canvas.height
        });
        const fov = this.camera.fov * (Math.PI / 180);
        const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
        const width = height * this.camera.aspect;
        this.webglViewport = { width, height, };
    }
    update() {
        this.renderer.render({ scene: this.scene, camera: this.camera });
    }
}
