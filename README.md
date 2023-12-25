# Image-OGL

oglimage is a compact JavaScript library leveraging OGL to seamlessly integrate responsive and scroll-reactive images into web applications. It transforms DOM images into dynamic WebGL canvas renderings, ensuring smooth adaptability across devices and engaging user interactions.

<br>

## Install

---

```bash
npm i oglimage
```
<br>

## Basic setup

---
```javascript
import Experience from "oglimage"

const experience = new Experience()

const myImage = document.querySelector(".my-image")

experience.addImage(myImage)
```
<br>

## Instance setting

---
| Option      | Type                | Default                                | Description                                  |
|-------------|---------------------|----------------------------------------|----------------------------------------------|
| `container` | `HTMLElement` | `document.body`                        | Specifies the DOM element for the canvas.    |
| `alpha`     | `boolean`           | `true`                                 | Enables canvas transparency.                 |
| `antialias` | `boolean`           | `true`                                 | Toggles antialiasing for smoother rendering. |
| `dpr`       | `number`            | `Math.min(window.devicePixelRatio, 2)` | Sets the device pixel ratio for the canvas.  |
| `scroll`    | `object`            | `false → browser scroll`               | Change the current value to your own scroll  |

<br>

## Instance Method: `addImage(image, options)`

| Option    | Type                                  | Description                                                                                       | 
|-----------|---------------------------------------|---------------------------------------------------------------------------------------------------|
| `image`   | `HTMLImageElement` or `null`          | The image to be transformed into a WebGL-renderable format.                                       |
| `options` | Object                                | Configuration options for the transformation.                                                    |
|           | `vertex` (optional)                   | Custom vertex shader.                                                                             |
|           | `fragment` (optional)                 | Custom fragment shader.                                                                           |
|           | `uniforms` (optional)                 | A function that returns custom uniforms.                                                          |


### Example

```javascript
// ...
experience.addImage(myImage, {
    vertex: vertex,
    fragment: fragment,
    uniformes: {
      uStrength: { value: 0.5 },  
    }
})

```
