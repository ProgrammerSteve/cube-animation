import { useRef, useEffect } from 'react';
import { mat4 } from 'gl-matrix';
import { genPts, genRandomPos } from './generatePoints';
import { easeInOutQuad } from './utils';

// Shader sources
const vertexShaderSource = `
    precision mediump float;
    attribute vec3 position;
    uniform mat4 modelViewProjectionMatrix;

    void main() {
        gl_Position = modelViewProjectionMatrix * vec4(position, 1.0);
        gl_PointSize = 3.0;
    }
`;

const fragmentShaderSource = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 0.9);
    }
`;

function App() {
    const canvasRef = useRef(null);
    const programRef = useRef(null);
    const pts=300
    const initialPos = genRandomPos(1, pts*12);
    const finalPos = genPts(1,pts)
    let startTime;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Initialize Web Worker
        //const worker = new Worker('animationWorker.js');
        // Communicate with the Web Worker to start the animation
        //worker.postMessage(/* Initial data if needed */);

        const gl = canvas.getContext('webgl');
        if (!gl)  throw new Error("WebGL not supported")

        let animationActive = true;
        
        canvas.width = window.innerWidth;
        canvas.height = 300;
        let vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.compileShader(vertexShader);
        let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentShaderSource);
        gl.compileShader(fragmentShader);
        let shaderProgram = gl.createProgram();
        programRef.current=shaderProgram
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        gl.useProgram(shaderProgram);
        let positionBuffer = gl.createBuffer();

        const uniformLocations = {
          matrix: gl.getUniformLocation(shaderProgram, 'modelViewProjectionMatrix'),
        };
         // Set up modelViewProjectionMatrix
         const mvpMatrix = mat4.create();
         gl.uniformMatrix4fv(uniformLocations.matrix, false, mvpMatrix);

        function startAnimation() {
            startTime = performance.now();
            requestAnimationFrame(animate);
        }
        // Animation loop
        function animate(currentTime) {
          if (!animationActive) return;
            gl.useProgram(programRef.current);
            let elapsedTime = currentTime - startTime;
            let animationDuration=3000
            let timeFlow=elapsedTime / animationDuration
            let progress = easeInOutQuad(Math.min(timeFlow, 1));
            let intermediatePositions = [];
            for (let i = 0; i < initialPos.length; i += 3) {
                let initialX = initialPos[i];
                let initialY = initialPos[i + 1];
                let initialZ = initialPos[i + 2];
                let finalX = finalPos[i];
                let finalY = finalPos[i + 1];
                let finalZ = finalPos[i + 2];
                let interpolatedX = initialX + (finalX - initialX) * progress;
                let interpolatedY = initialY + (finalY - initialY) * progress;
                let interpolatedZ = initialZ + (finalZ - initialZ) * progress;
                intermediatePositions.push(interpolatedX, interpolatedY, interpolatedZ);
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(intermediatePositions), gl.STATIC_DRAW);
            let positionAttributeLocation = gl.getAttribLocation(shaderProgram, "position");
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

            // Set up modelViewProjectionMatrix
            const mvMatrix = mat4.create();
            const mvpMatrix = mat4.create();

            //MODEL
            let modelMatrix = mat4.create();
            let angle = (60 * timeFlow*Math.PI/180); // Rotate by x degrees per second
            mat4.rotateY(modelMatrix, modelMatrix, angle); // Rotate around Y-axis
    
            //PROJECTION
            const fov = 70 * Math.PI / 180; // Field of view in radians
            const canvasAspect = canvas.width / canvas.height; // Aspect ratio of the canvas
            const distanceToOrigin = 2; // Adjust as needed
            const cameraPosition = [0, 0.65, distanceToOrigin];
            const near = 0.1; // Near clipping plane
            const far = 10000; // Far clipping plane
            const projectionMatrix = mat4.create();
            mat4.perspective(projectionMatrix, fov, canvasAspect, near, far);

            //VIEW
            let viewMatrix = mat4.create();
            mat4.lookAt(viewMatrix, cameraPosition, [0, 0, 0], [0, 1, 0]); // Eye position, Look-at position, Up vector
      
            //PUTTING IT ALL TOGETHER
            mat4.multiply(mvMatrix, viewMatrix, modelMatrix);
            mat4.multiply(mvpMatrix, projectionMatrix, mvMatrix);

            // Get uniform location
            //let matrixLocation = gl.getUniformLocation(shaderProgram, "modelViewProjectionMatrix");
            gl.uniformMatrix4fv(uniformLocations.matrix, false, mvpMatrix);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.POINTS, 0, intermediatePositions.length / 3);
            requestAnimationFrame(animate);
        }

      function handleResize() {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = 300;//window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
        //requestAnimationFrame(animate);
      }
      window.addEventListener('resize', handleResize);
      handleResize();
      startAnimation();
      return () => {
          window.removeEventListener('resize', handleResize);
          animationActive = false;
          if(gl){
            gl.deleteProgram(shaderProgram)
            gl.deleteBuffer(positionBuffer)
          }
      };

    }, []);
    return <canvas className='' ref={canvasRef} />;
}
export default App;