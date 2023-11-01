import { useEffect, useRef, useCallback } from "react";
import React from "react";
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
// https://codeguppy.com/code.html?Y5OJoQCN2rQnq5UlZaBk
type CanvasOptions = {
  gridSize: number;
  x_dis_gridlines: number;
  y_dis_gridlines: number;
  x_start: { val: number; suffix: any };
  y_start: { val: number; suffix: any };
  stroke: number;
  textSize?: number;
};

const defaultProps = {
  gridSize: 25,
  x_dis_gridlines: 5,
  y_dis_gridlines: 5,
  x_start: { val: 1, suffix: "" },
  y_start: { val: 1, suffix: "" },
  stroke: 1,
  textSize: 12,
};

const Canvas: React.FC<{
  func: any;
  height: number;
  width: number;
  options: CanvasOptions;
}> = ({ func, height, width, options }) => {
  const { gridSize, x_dis_gridlines, y_dis_gridlines } = options;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawCords = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const num_lines_x = Math.floor(ctx.canvas.height / gridSize);
      const num_lines_y = Math.floor(ctx.canvas.width / gridSize);
      drawCordX(ctx, options, num_lines_x);
      drawCordY(ctx, options, num_lines_y);
      ctx.translate(y_dis_gridlines * gridSize, x_dis_gridlines * gridSize);
      drawCordTicksX(ctx, options, num_lines_x);
      drawCordTicksY(ctx, options, num_lines_x);
      drawFunc(func, ctx, 1, 1, 0.1);
    },
    [func, options]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) createHiPPICanvas(canvas, width, height);
    const context = canvas?.getContext("2d");
    drawCords(context as CanvasRenderingContext2D);
    return () => {
      // @ts-ignore
      context!.reset();
    };
  }, [drawCords]);

  return (
    <canvas
      className="border border-black"
      ref={canvasRef}
      height={height || 500}
      width={width || 500}
    />
  );
};

Canvas.defaultProps = {
  height: 500,
  width: 500,
  options: defaultProps,
};

function createHiPPICanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number
) {
  const ratio = window.devicePixelRatio * 3;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  canvas.getContext("2d")!.scale(ratio, ratio);

  return canvas;
}
type MathFunction = (x: number) => number;

function drawFunc(equation: MathFunction, ctx: CanvasRenderingContext2D, startX: number, endX: number, step: number): void {
  ctx.beginPath();

  const rangeX = endX - startX;
  const rangeY = Math.abs(equation(endX)) * 2;

  for (let x = startX; x <= endX; x += step) {
    try {
      const y = equation(x);
      if (isNaN(y)) continue;

      const canvasX = mapValue(x, startX, endX, 0, ctx.canvas.width);
      const canvasY = mapValue(y, -rangeY / 2, rangeY / 2, ctx.canvas.height, 0);

      console.log(canvasX, canvasY);
      

      if (x === startX) {
        ctx.moveTo(canvasX, canvasY);
      } else {
        ctx.lineTo(canvasX, canvasY);
      }
    } catch (error) {
      console.error(error);
    }
  }

  ctx.strokeStyle = "blue";
  ctx.lineWidth = 2;
  ctx.stroke();
}
function mapValue(value: number, inputMin: number, inputMax: number, outputMin: number, outputMax: number): number {
  return ((value - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin) + outputMin;
}



// // Returns the right boundary of the logical viewport:
// function MaxX() {
//   return 10 ;
// }

// // Returns the left boundary of the logical viewport:
// function MinX() {
//   return -10 ;
// }

// // Returns the top boundary of the logical viewport:
// function MaxY() {
//   return MaxX() * 500 / 500;
// }

// // Returns the bottom boundary of the logical viewport:
// function MinY() {
//    return MinX() * 500 / 500;
// }

// // Returns the physical x-coordinate of a logical x-coordinate:
// function XC(x: number) {
//   return (x - MinX()) / (MaxX() - MinX()) * 500 ;
// }

// // Returns the physical y-coordinate of a logical y-coordinate:
// function YC(y: number) {
//   return 500 - (y - MinY()) / (MaxY() - MinY()) * 500 ;
// }

// function drawFunc(
//     func: (x: number) => number,
//     ctx: CanvasRenderingContext2D,
//     options: CanvasOptions
//   ) 
//   {
//   var first = true;

//   ctx.beginPath() ;
//   for (var x = MinX(); x <= MaxX(); x += (MaxX() - MinX()) / 500) {
//    var y = func(x) ;
//    if (first) {
//     ctx.moveTo(XC(x),YC(y)) ;
//     first = false ;
//    } else {
//     ctx.lineTo(XC(x),YC(y)) ;
//    }
//   }
//   ctx.stroke() ;
// }


function drawCordX(
  ctx: CanvasRenderingContext2D,
  Cord: CanvasOptions,
  num_lines_x: number
) {
  const { gridSize, x_dis_gridlines } = Cord;

  for (let i = 0; i <= num_lines_x; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;

    // If line represents X-axis draw in different color
    if (i == x_dis_gridlines) ctx.strokeStyle = "#000000";
    else ctx.strokeStyle = "#e9e9e9";

    if (i == num_lines_x) {
      ctx.moveTo(0, gridSize * i);
      ctx.lineTo(ctx.canvas.width, Cord.gridSize * i);
    } else {
      ctx.moveTo(0, gridSize * i + 0.5);
      ctx.lineTo(ctx.canvas.width, gridSize * i + 0.5);
    }
    ctx.stroke();
  }
}

function drawCordY(
  ctx: CanvasRenderingContext2D,
  Cord: CanvasOptions,
  num_lines_y: number
) {
  const { gridSize, y_dis_gridlines, stroke } = Cord;

  for (let i = 0; i <= num_lines_y; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1 * stroke;

    // If line represents Y-axis draw in different color
    if (i == y_dis_gridlines) ctx.strokeStyle = "#000000";
    else ctx.strokeStyle = "#e9e9e9";

    if (i == num_lines_y) {
      ctx.moveTo(gridSize * i, 0);
      ctx.lineTo(gridSize * i, ctx.canvas.height);
    } else {
      ctx.moveTo(gridSize * i + 0.5, 0);
      ctx.lineTo(gridSize * i + 0.5, ctx.canvas.height);
    }
    ctx.stroke();
  }
}

function drawCordTicksX(
  ctx: CanvasRenderingContext2D,
  Cord: CanvasOptions,
  num_lines_y: number
) {
  const { gridSize, y_dis_gridlines, x_start, stroke, textSize } = Cord;

  // Ticks marks along the positive X-axis
  for (let i = 1; i < num_lines_y - y_dis_gridlines; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1 * stroke;
    ctx.strokeStyle = "#000000";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(gridSize * i + 0.5, -3);
    ctx.lineTo(gridSize * i + 0.5, 3);
    ctx.stroke();

    // Text value at that point
    ctx.font = `${textSize}px Arial`;
    ctx.textAlign = "start";
    ctx.fillText(x_start.val * i + x_start.suffix, gridSize * i - 2, 15);
  }

  // Ticks marks along the negative X-axis
  for (let i = 1; i < y_dis_gridlines; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1 * stroke;
    ctx.strokeStyle = "#000000";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(-gridSize * i + 0.5, -3);
    ctx.lineTo(-gridSize * i + 0.5, 3);
    ctx.stroke();

    // Text value at that point
    ctx.font = `${textSize}px Arial`;
    ctx.textAlign = "end";
    ctx.fillText(-x_start.val * i + x_start.suffix, -gridSize * i + 3, 15);
  }
}

function drawCordTicksY(
  ctx: CanvasRenderingContext2D,
  Cord: CanvasOptions,
  num_lines_x: number
) {
  const { gridSize, x_dis_gridlines, y_start, stroke, textSize } = Cord;

  // Ticks marks along the positive Y-axis
  // Positive Y-axis of graph is negative Y-axis of the canvas
  for (let i = 1; i < num_lines_x - x_dis_gridlines; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1 * stroke;
    ctx.strokeStyle = "#000000";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(-3, gridSize * i + 0.5);
    ctx.lineTo(3, gridSize * i + 0.5);
    ctx.stroke();

    // Text value at that point
    ctx.font = `${textSize}px Arial`;
    ctx.textAlign = "start";
    ctx.fillText(-y_start.val * i + y_start.suffix, 8, gridSize * i + 3);
  }

  // Ticks marks along the negative Y-axis
  // Negative Y-axis of graph is positive Y-axis of the canvas
  for (let i = 1; i < x_dis_gridlines; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1 * stroke;
    ctx.strokeStyle = "#000000";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(-3, -gridSize * i + 0.5);
    ctx.lineTo(3, -gridSize * i + 0.5);
    ctx.stroke();

    // Text value at that point
    ctx.font = `${textSize}px Arial`;
    ctx.textAlign = "start";
    ctx.fillText(y_start.val * i + y_start.suffix, 8, -gridSize * i + 3);
  }
}

export default Canvas;
