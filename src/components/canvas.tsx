import { useEffect, useRef, useState } from "react";
import React, { Component } from 'react'
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
// https://codeguppy.com/code.html?Y5OJoQCN2rQnq5UlZaBk
type CanvasProps = {
    height: number
    width: number
    gridSize: number
    x_dis_gridlines: number
    y_dis_gridlines: number
    x_start: {val: number, suffix: any}
    y_start: {val: number, suffix: any}
}



const Canvas = (props: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const draw = (ctx: CanvasRenderingContext2D) => {
       
        const num_lines_x = Math.floor(ctx.canvas.height / props.gridSize);
        const num_lines_y = Math.floor(ctx.canvas.width / props.gridSize);
        drawCordX(ctx, props, num_lines_x);
        drawCordY(ctx, props, num_lines_y);
        ctx.translate(props.y_dis_gridlines*props.gridSize, props.x_dis_gridlines*props.gridSize);
        drawCordTicksX(ctx, props, num_lines_x);
        drawCordTicksY(ctx, props, num_lines_x);
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        draw(context as CanvasRenderingContext2D);
        return () => {
            // @ts-ignore
            context!.reset();
        }

    }, [draw])


    return (
      <canvas className="border border-black" ref={canvasRef} height={props.height || 500} width={props.width || 500} />
    )
}


function drawCordX(ctx: CanvasRenderingContext2D, Cord: CanvasProps, num_lines_x: number) {
    const {gridSize, x_dis_gridlines,} = Cord
    
    for(let i=0; i<=num_lines_x; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        
        // If line represents X-axis draw in different color
        if(i == x_dis_gridlines) 
            ctx.strokeStyle = "#000000";
        else
            ctx.strokeStyle = "#e9e9e9";
        
        if(i == num_lines_x) {
            ctx.moveTo(0, gridSize*i);
            ctx.lineTo(ctx.canvas.width, Cord.gridSize*i);
        }
        else {
            ctx.moveTo(0, gridSize*i+0.5);
            ctx.lineTo(ctx.canvas.width, gridSize*i+0.5);
        }
        ctx.stroke();
    }
}

function drawCordY(ctx: CanvasRenderingContext2D, Cord: CanvasProps, num_lines_y: number) {
    const {gridSize, y_dis_gridlines,} = Cord
    
    for(let i=0; i<= num_lines_y; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        
        // If line represents Y-axis draw in different color
        if(i == y_dis_gridlines) 
            ctx.strokeStyle = "#000000";
        else
            ctx.strokeStyle = "#e9e9e9";
        
        if(i == num_lines_y) {
            ctx.moveTo(gridSize*i, 0);
            ctx.lineTo(gridSize*i, ctx.canvas.height);
        }
        else {
            ctx.moveTo(gridSize*i+0.5, 0);
            ctx.lineTo(gridSize*i+0.5, ctx.canvas.height);
        }
        ctx.stroke();
    }
}

function drawCordTicksX(ctx: CanvasRenderingContext2D, Cord: CanvasProps, num_lines_y: number) {
    const {gridSize,y_dis_gridlines, x_start} = Cord

// Ticks marks along the positive X-axis
for(let i=1; i<(num_lines_y - y_dis_gridlines); i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(gridSize*i+0.5, -3);
    ctx.lineTo(gridSize*i+0.5, 3);
    ctx.stroke();

    // Text value at that point
    ctx.font = '9px Arial';
    ctx.textAlign = 'start';
    ctx.fillText(x_start.val*i + x_start.suffix, gridSize*i-2, 15);
}

// Ticks marks along the negative X-axis
for(let i=1; i<y_dis_gridlines; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(-gridSize*i+0.5, -3);
    ctx.lineTo(-gridSize*i+0.5, 3);
    ctx.stroke();

    // Text value at that point
    ctx.font = '9px Arial';
    ctx.textAlign = 'end';
    ctx.fillText(-x_start.val*i + x_start.suffix, -gridSize*i+3, 15);
}
}

function drawCordTicksY(ctx: CanvasRenderingContext2D, Cord: CanvasProps, num_lines_x: number) {
    const {gridSize,x_dis_gridlines, y_start} = Cord

    // Ticks marks along the positive Y-axis
// Positive Y-axis of graph is negative Y-axis of the canvas
for(let i=1; i<(num_lines_x - x_dis_gridlines); i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(-3, gridSize*i+0.5);
    ctx.lineTo(3, gridSize*i+0.5);
    ctx.stroke();

    // Text value at that point
    ctx.font = '9px Arial';
    ctx.textAlign = 'start';
    ctx.fillText(-y_start.val*i + y_start.suffix, 8, gridSize*i+3);
}

// Ticks marks along the negative Y-axis
// Negative Y-axis of graph is positive Y-axis of the canvas
for(let i=1; i<x_dis_gridlines; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(-3, -gridSize*i+0.5);
    ctx.lineTo(3, -gridSize*i+0.5);
    ctx.stroke();

    // Text value at that point
    ctx.font = '9px Arial';
    ctx.textAlign = 'start';
    ctx.fillText(y_start.val*i + y_start.suffix, 8, -gridSize*i+3);
}
}

function DrawFunc(ctx: CanvasRenderingContext2D, Cord: CanvasProps){
    
}



export default Canvas;