// animationWorker.js
self.onmessage = function(e) {
    const { initialPos, finalPos, startTime, currentTime } = e.data;

    const animationDuration = 3000;
    const timeFlow = (currentTime - startTime) / animationDuration;
    const progress = easeInOutQuad(Math.min(timeFlow, 1));

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

    self.postMessage({ intermediatePositions, currentTime });
};

function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}