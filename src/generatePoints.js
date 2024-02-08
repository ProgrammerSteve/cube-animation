export const genRandomPos = (s, pts) => {
    let buffer = new Float32Array(pts * 3);
    let multiplier=s*1.0
    let incr = 0;
    for (let i = 0; i < pts; i++) {
        buffer[incr++] = multiplier * Math.random() * (Math.random() > 0.5 ? 1 : -1);
        buffer[incr++] = 0.5* Math.random() * (Math.random() > 0.5 ? 1 : -1);
        buffer[incr++] = multiplier * Math.random() * (Math.random() > 0.5 ? 1 : -1);
    }
    return buffer;
};

const genL1=(s,pts)=>{
    let interval=1/(pts-1)
    let buffer=new Float32Array(pts*3)
    let incr=0
    for(let i=0;i<pts;i++){
        buffer[incr++]=s/2
        buffer[incr++]=-(s/2)+s*interval*i
        buffer[incr++]=-s/2
    }
    return buffer
}
const genL2=(s,pts)=>{
    let interval=1/(pts-1)
    let buffer=new Float32Array(pts*3)
    let incr=0
    for(let i=0;i<pts;i++){
        buffer[incr++]=s/2 - s*interval*i
        buffer[incr++]=s/2
        buffer[incr++]=-s/2
    }
    return buffer
}
const genL3=(s,pts)=>{
    let interval=1/(pts-1)
    let buffer=new Float32Array(pts*3)
    let incr=0
    for(let i=0;i<pts;i++){
        buffer[incr++]=-s/2
        buffer[incr++]=(s/2)-s*interval*i
        buffer[incr++]=-s/2
    }
    return buffer
}
const genL4=(s,pts)=>{
    let interval=1/(pts-1)
    let buffer=new Float32Array(pts*3)
    let incr=0
    for(let i=0;i<pts;i++){
        buffer[incr++]=-(s/2)+s*interval*i
        buffer[incr++]=-s/2
        buffer[incr++]=-s/2
    }
    return buffer
}






const genL5=(s,pts)=>{
    let interval=1/(pts-1)
    let buffer=new Float32Array(pts*3)
    let incr=0
    for(let i=0;i<pts;i++){
        buffer[incr++]=(s/2)
        buffer[incr++]=-(s/2)
        buffer[incr++]=(s/2)-s*interval*i
    }
    return buffer
}
const genL6=(s,pts)=>{
    let interval=1/(pts-1)
    let buffer=new Float32Array(pts*3)
    let incr=0
    for(let i=0;i<pts;i++){
        buffer[incr++]=(s/2)
        buffer[incr++]=(s/2)
        buffer[incr++]=(s/2)-s*interval*i
    }
    return buffer
}
const genL7=(s,pts)=>{
    let interval=1/(pts-1)
    let buffer=new Float32Array(pts*3)
    let incr=0
    for(let i=0;i<pts;i++){
        buffer[incr++]=-(s/2)
        buffer[incr++]=s/2
        buffer[incr++]=(s/2)-s*interval*i
    }
    return buffer
}
const genL8=(s,pts)=>{
    let interval=1/(pts-1)
    let buffer=new Float32Array(pts*3)
    let incr=0
    for(let i=0;i<pts;i++){
        buffer[incr++]=-(s/2)
        buffer[incr++]=-(s/2)
        buffer[incr++]=(s/2)-s*interval*i
    }
    return buffer
}

const genL9=(s,pts)=>{
    let interval=1/(pts-1)
    let buffer=new Float32Array(pts*3)
    let incr=0
    for(let i=0;i<pts;i++){
        buffer[incr++]=(s/2)
        buffer[incr++]=-(s/2)+s*interval*i
        buffer[incr++]=(s/2)
    }
    return buffer
}
const genL10=(s,pts)=>{
    let interval=1/(pts-1)
    let buffer=new Float32Array(pts*3)
    let incr=0
    for(let i=0;i<pts;i++){
        buffer[incr++]=(s/2)-s*interval*i
        buffer[incr++]=(s/2)
        buffer[incr++]=(s/2)
    }
    return buffer
}
const genL11=(s,pts)=>{
    let interval=1/(pts-1)
    let buffer=new Float32Array(pts*3)
    let incr=0
    for(let i=0;i<pts;i++){
        buffer[incr++]=-(s/2)
        buffer[incr++]=(s/2)-s*interval*i
        buffer[incr++]=(s/2)
    }
    return buffer
}
const genL12=(s,pts)=>{
    let interval=1/(pts-1)
    let buffer=new Float32Array(pts*3)
    let incr=0
    for(let i=0;i<pts;i++){
        buffer[incr++]=-(s/2)+s*interval*i
        buffer[incr++]=-(s/2)
        buffer[incr++]=(s/2)
    }
    return buffer
}





export const genPts=(s,pts)=>{
    let buffer=new Float32Array(pts*3*12)
    let incr=0
    let buff1=genL1(s,pts)
    let buff2=genL2(s,pts)
    let buff3=genL3(s,pts)
    let buff4=genL4(s,pts)
    let buff5=genL5(s,pts)
    let buff6=genL6(s,pts)
    let buff7=genL7(s,pts)
    let buff8=genL8(s,pts)
    let buff9=genL9(s,pts)
    let buff10=genL10(s,pts)
    let buff11=genL11(s,pts)
    let buff12=genL12(s,pts)
    for(let i=0;i<pts*3;i++)buffer[incr++]=buff1[i]
    for(let i=0;i<pts*3;i++)buffer[incr++]=buff2[i]
    for(let i=0;i<pts*3;i++)buffer[incr++]=buff3[i]
    for(let i=0;i<pts*3;i++)buffer[incr++]=buff4[i]
    for(let i=0;i<pts*3;i++)buffer[incr++]=buff5[i]
    for(let i=0;i<pts*3;i++)buffer[incr++]=buff6[i]
    for(let i=0;i<pts*3;i++)buffer[incr++]=buff7[i]
    for(let i=0;i<pts*3;i++)buffer[incr++]=buff8[i]
    for(let i=0;i<pts*3;i++)buffer[incr++]=buff9[i]
    for(let i=0;i<pts*3;i++)buffer[incr++]=buff10[i]
    for(let i=0;i<pts*3;i++)buffer[incr++]=buff11[i]
    for(let i=0;i<pts*3;i++)buffer[incr++]=buff12[i]
    return buffer
}