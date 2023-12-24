import {Renderer, Program, Mesh, Camera, Transform, Texture, Plane, OGLRenderingContext} from "ogl";
import {ICanvas} from "./Canvas.ts";

import IOGLImage from "../interfaces/IOGLImages.ts";


/**
 * WebGL Image
 *
 * @class OGLImage
 * @implements {IOGLImage}
 *
 */
class OGLImage implements IOGLImage {
    image: HTMLImageElement
    gl: OGLRenderingContext
    renderer: Renderer
    camera: Camera
    scene: Transform
    viewport: { width: number; height: number }
    geometry: Plane
    shaders: { vertex: string; fragment: string }
    webglImage!: Mesh
    screen: { width: number; height: number }
    uniforms: any
    onUpdate: () => void


    bounds: {
        width: number;
        height: number;
        left: number;
        right: number;
        top: number;
        bottom: number;
    }


    constructor(
        {
            image,
            canvas,
            geometry,
            shaders,
            uniforms = {},
            onUpdate = ():void => {}
        }: {
            image: HTMLImageElement,
            canvas: ICanvas,
            geometry: Plane,
            shaders: {
                vertex: string,
                fragment: string
            },
            uniforms?: object,
            onUpdate?: () => void
        }) {

        this.gl = canvas.gl;
        this.renderer = canvas.renderer;
        this.camera = canvas.camera;
        this.scene = canvas.scene;
        this.viewport = canvas.webglViewport;
        this.screen = canvas.screen;
        this.uniforms = uniforms;
        this.onUpdate = onUpdate;


        this.geometry = geometry;

        this.image = image;
        this.shaders = shaders;

        this.bounds = {
            width: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        }

        this.createMesh();
        this.createBounds();
        this.resize()
    }


    private createMesh(): void {

        const image = this.image;
        const texture = new Texture(this.gl, {
            generateMipmaps: false,
        })

        image.crossOrigin = 'Anonymous';
        image.src = this.image.src;

        this.image.onload = () => {
            texture.image = image;
            program.uniforms.uImageSizes.value = [image.naturalWidth, image.naturalHeight];
        }

        const {vertex, fragment} = this.shaders;

        const program = new Program(this.gl, {
            vertex,
            fragment,
            uniforms: {
                tMap: {value: texture},
                uScreenSize: {value: [0, 0]},
                uTextureSize: {value: [0, 0]},
                uPlaneSizes: {value: [0, 0]},
                uImageSizes: {value: [0, 0]},
                uViewportSizes: {value: [this.viewport.width, this.viewport.height]},
                uTime: {value: 0},
                ...this.uniforms,
            },
            transparent: true,
        })


        this.webglImage = new Mesh(this.gl, {
            geometry: this.geometry,
            program,
        })

        this.webglImage.setParent(this.scene);
    }

    private createBounds(): void {
        this.bounds = this.image.getBoundingClientRect();

        this.updateScale();
        this.updateX();
        this.updateY();

        this.webglImage.program.uniforms.uPlaneSizes.value = [this.webglImage.scale.x, this.webglImage.scale.y]
    }

    private updateScale() {
        this.webglImage.scale.x = this.viewport.width * this.bounds.width / this.screen.width
        this.webglImage.scale.y = this.viewport.height * this.bounds.height / this.screen.height
    }

    updateX(x: number = 0) {
        this.webglImage.position.x = -(this.viewport.width / 2) + (this.webglImage.scale.x / 2) + ((this.bounds.left - x) / this.screen.width) * this.viewport.width
    }

    updateY(y: number = 0) {
        this.webglImage.position.y = (this.viewport.height / 2) - (this.webglImage.scale.y / 2) - ((this.bounds.top - y) / this.screen.height) * this.viewport.height
    }

    public resize(sizes: {
        screen: { width: number, height: number },
        viewport: { width: number, height: number }
    } | undefined = undefined) {

        if (sizes) {
            const {screen, viewport} = sizes;

            if (screen) this.screen = screen;
            if (viewport) {
                this.viewport = viewport;
                this.webglImage.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height]
            }
        }

        this.createBounds()
    }

    public update(y:number = 0) {

        // BOUNDS
        this.updateScale()
        this.updateX()
        this.updateY(y)

        // USER
        this.onUpdate();

        // UNIFORM
        this.webglImage.program.uniforms.uTime.value += 0.01;
    }

}

export default OGLImage;
