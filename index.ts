import {Camera, OGLRenderingContext, Renderer, Transform, Mesh, Plane} from "ogl";
import Canvas from "./core/Canvas";
import OGLImage from "./core/OGLImage";


/**
 * WebGL Experience
 */
export interface IExperience {
    canvas: Canvas
    geometry: Mesh[] | any
    userData: {
        webglImages: OGLImage[],
        scroll: {
            current: number,
        }
    }

    addImage(image: HTMLImageElement | null, options: AddImageOptions): void;
}

/**
 * WebGL Image Options
 * @interface AddImageOptions
 * @property {string} vertex - Vertex.
 * @property {string} fragment - Fragment.
 * @property {object} uniforms
 *     - tMap: {value: texture},
 *     - uScreenSize: {value: [0, 0]},
 *     - uTextureSize: {value: [0, 0]},
 *     - uPlaneSizes: {value: [0, 0]},
 *     - uImageSizes: {value: [0, 0]},
 *     - uViewportSizes: {value: [this.viewport.width, this.viewport.height]},
 *     - uTime: {value: 0},
 * @property {function} onUpdate - Add some code to run on update.
 */
export interface AddImageOptions {
    vertex?: string;
    fragment?: string;
    uniforms?: (this: WebGLRenderingContext) => object;
    onUpdate?: (this: WebGLRenderingContext) => void;
}

/**
 * User Data
 *
 * @interface
 * @property {OGLImage[]} webglImages - Array containing all WebGL images.
 * @property {object} scroll - Object for tracking scroll position.
 * @property {number} scroll.current - The current scroll position, initialized to 0.
 */
export interface UserData {
    webglImages: OGLImage[];
    scroll: {
        current: number;
    };
}

/**
 * WebGL Canvas
 */
export interface ICanvas {
    renderer: Renderer
    gl: OGLRenderingContext
    camera: Camera
    scene: Transform
    screen: { width: number; height: number }
    webglViewport: { width: number; height: number }

    resize(): void
    update(): void
}

/**
 * WebGL Image
 *
 * @interface IOGLImage
 *
 */
export interface IOGLImage {
    image: HTMLImageElement
    gl: OGLRenderingContext
    renderer: Renderer
    camera: Camera
    scene: Transform
    viewport: { width: number; height: number }
    geometry: Plane
    shaders: { vertex: string; fragment: string }
    webglImage: Mesh
    screen: { width: number; height: number }
    uniforms: any
    onUpdate: () => void
}


