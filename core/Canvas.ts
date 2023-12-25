import {Camera, OGLRenderingContext, Renderer, Transform} from "ogl";

import {ICanvas} from "../index";

export default class Canvas implements ICanvas {
    renderer!: Renderer
    gl!: OGLRenderingContext
    camera!: Camera
    scene!: Transform
    screen!: { width: number; height: number }
    webglViewport!: { width: number; height: number }

    private container: HTMLElement
    readonly alpha: boolean
    readonly antialias: boolean
    readonly dpr: number


    constructor({
        container = document.body,
        alpha = true,
        antialias = true,
        dpr = Math.min(window.devicePixelRatio, 2),
    } = {})
    {

        this.container = container;
        this.alpha = alpha;
        this.antialias = antialias;
        this.dpr = dpr;

        this.createRenderer();
        this.createCamera();
        this.createScene();
        this.resize();
    }

    private createRenderer(): void {
        this.renderer = new Renderer({
            dpr: this.dpr,
            antialias: this.antialias,
            alpha: this.alpha,
        })

        this.gl = this.renderer.gl

        this.container.appendChild(this.gl.canvas as HTMLCanvasElement)
    }

    private createCamera(): void {
        this.camera = new Camera(this.gl)
        this.camera.position.z = 5
    }

    private createScene(): void {
        this.scene = new Transform()
    }

    public resize() {
        this.screen = {
            width: window.innerWidth,
            height: window.innerHeight,
        }

        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.camera.perspective({
            aspect: this.gl.canvas.width / this.gl.canvas.height
        })

        const fov = this.camera.fov * (Math.PI / 180)
        const height = 2 * Math.tan(fov / 2) * this.camera.position.z
        const width = height * this.camera.aspect

        this.webglViewport = {width, height,}
    }

    public update() {
        this.renderer.render({scene: this.scene, camera: this.camera})
    }
}

