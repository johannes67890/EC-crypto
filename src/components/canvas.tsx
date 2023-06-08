import { useRef } from "react";
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
type CanvasProps = {
    height?: number
    width?: number
}


const Canvas = (props: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    return (
      <canvas height={props.height || 500} width={props.width || 500} />
    )
}

function drawCord(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'rgb(200, 0, 0)'
    ctx.fillRect(10, 10, 50, 50)
}



export default Canvas;