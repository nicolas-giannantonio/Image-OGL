import Canvas from "../classes/Canvas.ts";
import {Mesh} from "ogl";
import OGLImage from "../classes/OGLImage.ts";



interface IExperience {
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
interface AddImageOptions {
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
interface UserData {
    webglImages: OGLImage[];
    scroll: {
        current: number;
    };
}


export type {IExperience, AddImageOptions, UserData}
