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
    const now = Date.now();
    const dt = Math.max(1, now - lastMouse.time);
    const dx = coords.x - lastMouse.x;
    const dy = coords.y - lastMouse.y;
    const speed = Math.hypot(dx, dy) / dt * 30;

    const targetScale = Math.max(0.5, 1 - speed / 16);
    currentScale += (targetScale - currentScale) * 0.15;

    let x = coords.x;
    let y = coords.y;

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    circles.forEach((circle, index) => {
        circle.x += (x - circle.x) * 0.2;
        circle.y += (y - circle.y) * 0.2;
        
        const sizeScale = (1 - index * 0.05) * currentScale;
        const radius = 0 * sizeScale;
        
        circle.style.left = (circle.x - coords.x) + "px";
        circle.style.top = (circle.y - coords.y) + "px";
        circle.style.transform = `translate(-50%, -50%) scale(${sizeScale})`;
        
        minX = Math.min(minX, circle.x - radius);
        maxX = Math.max(maxX, circle.x + radius);
        minY = Math.min(minY, circle.y - radius);
        maxY = Math.max(maxY, circle.y + radius);
        
        x = circle.x;
        y = circle.y;
    });

    const wrapperWidth = maxX - minX + 20;
    const wrapperHeight = maxY - minY + 20;
    const wrapperX = (minX + maxX) / 2;
    const wrapperY = (minY + maxY) / 2;

    wrapper.style.width = wrapperWidth + "px";
    wrapper.style.height = wrapperHeight + "px";
    wrapper.style.left = wrapperX + "px";
    wrapper.style.top = wrapperY + "px";
    wrapper.style.transform = `translate(-50%, -50%)`;

    lastMouse.x = coords.x;
    lastMouse.y = coords.y;
    lastMouse.time = now;

    requestAnimationFrame(animateCircles);
}

animateCircles();