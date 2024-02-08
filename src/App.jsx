import { useRef, useEffect } from 'react';
import { mat4 } from 'gl-matrix';
import { genPts, genRandomPos } from './generatePoints';

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
    const pts=300
    const initialPos = genRandomPos(1, pts*12);
    const finalPos = genPts(1,pts)
    let startTime;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl');
        if (!gl) {
            throw new Error("WebGL not supported");
        }
                // Set canvas width to match screen width
                canvas.width = window.innerWidth;
                canvas.height = 300;//window.innerHeight;
        // Create shaders
        let vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.compileShader(vertexShader);
        let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentShaderSource);
        gl.compileShader(fragmentShader);

        // Create shader program
        let shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        gl.useProgram(shaderProgram);

        // Create buffers
        let positionBuffer = gl.createBuffer();
        // Function to start animation
        function startAnimation() {
            // Start animation loop
            startTime = performance.now();
            requestAnimationFrame(animate);
        }
        // Animation loop
        function animate(currentTime) {
            // Calculate elapsed time since animation started
            let elapsedTime = currentTime - startTime;
            let animationDuration=3000
            let timeFlow=elapsedTime / animationDuration
            // Calculate progress of animation (from 0 to 1)
            //let progress = Math.min(elapsedTime / animationDuration, 1);
            let progress = easeInOutQuad(Math.min(timeFlow, 1));

            // Easing functions
            function easeOutQuad(t) {
              return t * (2 - t);
            }
            function easeInOutSine(t) {
              return -0.5 * (Math.cos(Math.PI * t) - 1);
            }
            function easeInOutQuad(t) {
              return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            }
            function linear(t) {
              return t;
            }


            // Interpolate positions for each point
            let intermediatePositions = [];
            for (let i = 0; i < initialPos.length; i += 3) {
                let initialX = initialPos[i];
                let initialY = initialPos[i + 1];
                let initialZ = initialPos[i + 2];

                let finalX = finalPos[i];
                let finalY = finalPos[i + 1];
                let finalZ = finalPos[i + 2];

                // Linear interpolation
                let interpolatedX = initialX + (finalX - initialX) * progress;
                let interpolatedY = initialY + (finalY - initialY) * progress;
                let interpolatedZ = initialZ + (finalZ - initialZ) * progress;

                intermediatePositions.push(interpolatedX, interpolatedY, interpolatedZ);
            }

            // Update buffers with intermediate positions
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(intermediatePositions), gl.STATIC_DRAW);

            // Set up vertex attributes
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
            let matrixLocation = gl.getUniformLocation(shaderProgram, "modelViewProjectionMatrix");
            gl.uniformMatrix4fv(matrixLocation, false, mvpMatrix);
            //gl.viewport(0, 0, canvas.width, canvas.height);
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
        requestAnimationFrame(animate);
      }
      window.addEventListener('resize', handleResize);
      handleResize();
      startAnimation();
      return () => {
          window.removeEventListener('resize', handleResize);
      };

    }, []);

    return <canvas className='' ref={canvasRef} />;
}

export default App;