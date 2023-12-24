import {Camera, Mesh, OGLRenderingContext, Plane, Renderer, Transform} from "ogl";

/**
 * WebGL Image
 *
 * @interface IOGLImage
 *
 */
interface IOGLImage {
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

export default IOGLImage
