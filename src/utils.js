export function easeOutQuad(t) {
return t * (2 - t);
}
export function easeInOutSine(t) {
return -0.5 * (Math.cos(Math.PI * t) - 1);
}

export function linear(t) {
return t;
}

export function easeInOutQuad(t) {
return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}