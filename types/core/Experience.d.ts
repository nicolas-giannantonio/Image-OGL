import { Plane } from "ogl";
import Canvas from "./Canvas";
import { IExperience, AddImageOptions, UserData } from "../index";
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
export default class Experience implements IExperience {
    canvas: Canvas;
    geometry: {
        plane: Plane;
    };
    userData: UserData;
    container: HTMLElement;
    alpha: boolean;
    antialias: boolean;
    dpr: number;
    scroll: {
        current: boolean | number;
    };
    constructor({ container, alpha, antialias, dpr, scroll, }?: {
        container?: HTMLElement | undefined;
        alpha?: boolean | undefined;
        antialias?: boolean | undefined;
        dpr?: number | undefined;
        scroll?: {
            current: boolean;
        } | undefined;
    });
    private update;
    private resize;
    private onScroll;
    private addEvents;
    /**
     * Transform an image into a WebGL texture
     * @param image HTMLImageElement
     * @param options @see AddImageOptions
     */
    addImage(image: HTMLImageElement | null, options?: AddImageOptions): void;
}
