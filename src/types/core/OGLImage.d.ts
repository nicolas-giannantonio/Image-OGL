import { Renderer, Mesh, Camera, Transform, Plane, OGLRenderingContext } from "ogl";
import { ICanvas } from "../index";
import { IOGLImage } from "../index";
/**
 * WebGL Image
 *
 * @class OGLImage
 * @implements {IOGLImage}
 *
 */
export default class OGLImage implements IOGLImage {
    image: HTMLImageElement;
    gl: OGLRenderingContext;
    renderer: Renderer;
    camera: Camera;
    scene: Transform;
    viewport: {
        width: number;
        height: number;
    };
    geometry: Plane;
    shaders: {
        vertex: string;
        fragment: string;
    };
    webglImage: Mesh;
    screen: {
        width: number;
        height: number;
    };
    uniforms: any;
    onUpdate: () => void;
    bounds: {
        width: number;
        height: number;
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    constructor({ image, canvas, geometry, shaders, uniforms, onUpdate }: {
        image: HTMLImageElement;
        canvas: ICanvas;
        geometry: Plane;
        shaders: {
            vertex: string;
            fragment: string;
        };
        uniforms?: object;
        onUpdate?: () => void;
    });
    private createMesh;
    private createBounds;
    private updateScale;
    updateX(x?: number): void;
    updateY(y?: number): void;
    resize(sizes?: {
        screen: {
            width: number;
            height: number;
        };
        viewport: {
            width: number;
            height: number;
        };
    } | undefined): void;
    update(y?: number): void;
}
