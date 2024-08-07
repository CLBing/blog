import React, { useEffect, useRef } from "react"


const width=600
const height=600

async function getLogoImgParticle(src:string,name:string) {
    let img = new Image();
    img.crossOrigin=''
    img.src=src
    img.onload=()=>{
        const canvas= document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const imgW = width;
        const imgH = height;
        canvas.width=imgW
        canvas.height=imgH
    }
}

async function Particle(total:number,totalY:number,time:number,color:number[]) {
    
}

export default function LogoParticle():JSX.Element{
    const canvasRef =useRef<HTMLCanvasElement>()

    useEffect(()=>{

        const canvas = canvasRef.current
        const particleCanvas = canvas.getContext('2d')
    },[])
    return (
        <div>
            <canvas ref={canvasRef} width={width} height={height} ></canvas>
        </div>
    )
}