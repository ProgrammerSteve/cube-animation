// animationWorker.js
function performAnimation() {
    // Your animation logic goes here
    // This is just a simple example
    
    // Simulate an animation by incrementing a counter
    let counter = 0;
    const animationDuration = 3000; // Duration of the animation in milliseconds

    // Start the animation loop
    const startTime = performance.now();

    function animate() {
        const currentTime = performance.now();
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);

        // Update the counter based on the animation progress
        counter = Math.floor(progress * 100);

        // Check if animation is complete
        if (progress < 1) {
            // If animation is not complete, continue the animation loop
            requestAnimationFrame(animate);
        } else {
            // If animation is complete, post the result back to the main thread
            self.postMessage({ counter });
        }
    }

    // Start the animation loop
    animate();
}





self.onmessage = function(e) {
    performAnimation();
};
