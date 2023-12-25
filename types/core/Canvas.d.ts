import { Camera, OGLRenderingContext, Renderer, Transform } from "ogl";
import { ICanvas } from "../index";
export default class Canvas implements ICanvas {
    renderer: Renderer;
    gl: OGLRenderingContext;
    camera: Camera;
    scene: Transform;
    screen: {
        width: number;
        height: number;
    };
    webglViewport: {
        width: number;
        height: number;
    };
    private container;
    readonly alpha: boolean;
    readonly antialias: boolean;
    readonly dpr: number;
    constructor({ container, alpha, antialias, dpr, }?: {
        container?: HTMLElement | undefined;
        alpha?: boolean | undefined;
        antialias?: boolean | undefined;
        dpr?: number | undefined;
    });
    private createRenderer;
    private createCamera;
    private createScene;
    resize(): void;
    update(): void;
}
