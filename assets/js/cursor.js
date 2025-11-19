const coords = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const wrapper = document.querySelector(".cursor-wrapper");
const circles = document.querySelectorAll(".circle");
let lastMouse = { x: coords.x, y: coords.y, time: Date.now() };
let currentScale = 1;

circles.forEach(c => { 
    c.x = coords.x; 
    c.y = coords.y; 
});

window.addEventListener("mousemove", e => {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    const now = Date.now();
    const dt = Math.max(1, now - lastMouse.time);
    const dx = coords.x - lastMouse.x;
    const dy = coords.y - lastMouse.y;
    const speed = Math.hypot(dx, dy) / dt * 16;

    const targetScale = Math.max(0.5, 1 - speed / 25);
    currentScale += (targetScale - currentScale) * 0.15;

    circles.forEach((circle, index) => {
        circle.style.left = x + "px";
        circle.style.top = y + "px";
        
        const sizeScale = (1 - index * 0.03) * currentScale;
        circle.style.transform = `translate(-50%, -50%) scale(${sizeScale})`;
        
        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.25;
        y += (nextCircle.y - y) * 0.25;
        
        circle.x = x;
        circle.y = y;
    });

    const first = circles[0];
    const last = circles[circles.length - 1];
    const centerX = (first.x + last.x) / 2;
    const centerY = (first.y + last.y) / 2;
    const distance = Math.hypot(last.x - first.x, last.y - first.y) + 60;

    wrapper.style.width = distance + "px";
    wrapper.style.height = distance + "px";
    wrapper.style.left = centerX + "px";
    wrapper.style.top = centerY + "px";
    wrapper.style.transform = `translate(-50%, -50%)`;

    lastMouse.x = coords.x;
    lastMouse.y = coords.y;
    lastMouse.time = now;

    requestAnimationFrame(animateCircles);
}

animateCircles();