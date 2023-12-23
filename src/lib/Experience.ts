import {Mesh, Plane} from "ogl";


import Canvas from "./Canvas.ts";
import OGLImage from "./OGLImage.ts";


interface IExperience {
    canvas: Canvas
    geometry: Mesh[] | any
    userData: {
        webglImages: OGLImage[],
        scroll: {
            current: number,
        }
    }

    addImage(image: HTMLImageElement, options: { vertex: string, fragment: string }): void
}

class Experience implements IExperience {
    canvas: Canvas
    geometry: Mesh[] | any
    userData: { webglImages: OGLImage[], scroll: { current: number }}

    scroll: {
        current: boolean | number,
    }


    constructor({
        scroll = {current: false}} = {}) {

        this.scroll = scroll;

        this.canvas = new Canvas()

        this.geometry = {
            plane: new Plane(this.canvas.gl)
        }

        this.userData = {
            webglImages: [],
            scroll: {
                current: 0,
            }
        }

        this.addEvents()
    }

    private update() {
        this.canvas.update()

        this.userData.webglImages.forEach((webglImage: OGLImage) => {
            webglImage.update(this.userData.scroll.current)
        })

        window.requestAnimationFrame(this.update.bind(this))
    }

    private resize() {
        this.canvas.resize()

        this.userData.webglImages.forEach((webglImage: OGLImage) => {
            webglImage.resize({
                screen: this.canvas.screen,
                viewport: this.canvas.webglViewport
            })
        })
    }

    private onScroll() {
        if(typeof this.scroll.current === "number") {
            this.userData.scroll.current = (this.userData.scroll.current / window.innerHeight) * this.canvas.webglViewport.height * (window.innerHeight / this.canvas.webglViewport.height)
        } else {
            // Normalize scroll with webgl
            this.userData.scroll.current = (window.scrollY / window.innerHeight) * this.canvas.webglViewport.height * (window.innerHeight / this.canvas.webglViewport.height)
        }
    }


    private addEvents() {

        window.addEventListener('resize', this.resize.bind(this))
        window.addEventListener('scroll', this.onScroll.bind(this))

        window.requestAnimationFrame(this.update.bind(this))
    }

    public addImage(
        image: HTMLImageElement,
        options: {
            vertex: string,
            fragment: string
        }
    ): void {
        const webglImage: OGLImage = new OGLImage({
            canvas: this.canvas,
            geometry: this.geometry.plane,
            image: image,
            shaders: {
                vertex: options.vertex,
                fragment: options.fragment
            }
        })

        this.userData.webglImages.push(webglImage)
        this.userData.webglImages.forEach((webglImage: OGLImage) => {
            console.log(webglImage)
        })
    }

}


export default Experience
export type {IExperience};
