
import { Camera, Renderer, Transform,OGLRenderingContext } from 'ogl'
interface ICanvas {
    renderer: Renderer
    gl: OGLRenderingContext
    camera: Camera
    scene: Transform
    screen: { width: number; height: number }
    webglViewport: { width: number; height: number }

    resize(): void
    update(): void
}

export default ICanvas
