const coords = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const wrapper = document.querySelector(".cursor-wrapper");
const circles = document.querySelectorAll(".circle");
const innerCircle = document.querySelector(".inner-circle");
const carousel = document.querySelector(".carousel");
const group = document.querySelector(".group");
const video = document.getElementById('interactive-video');

let lastMouse = { x: coords.x, y: coords.y, time: Date.now() };
let currentScale = 1;
let hoveringCard = false;
let cardTarget = { x: 0, y: 0, width: 0, height: 0 };
let trailAngle = 0;

circles.forEach(c => { 
    c.x = coords.x; 
    c.y = coords.y; 
});

window.addEventListener("mousemove", e => {
    coords.x = e.clientX;
    coords.y = e.clientY;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const mouseX = (e.clientX / windowWidth - 0.5) * 20;
    const mouseY = (e.clientY / windowHeight - 0.5) * 20;

    video.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});


document.querySelectorAll('button, .resume-button, .icons a').forEach(el => {
    el.addEventListener('mouseenter', () => {
        const rect = el.getBoundingClientRect();
        hoveringCard = true;
        cardTarget.x = rect.left + rect.width / 2;
        cardTarget.y = rect.top + rect.height / 2;
        cardTarget.width = rect.width;
        cardTarget.height = rect.height;
    });

    el.addEventListener('mouseleave', () => {
        hoveringCard = false;
    });
});

carousel.addEventListener('wheel', e => {
    e.preventDefault();
}, { passive: false });

function animateCircles() {
    const now = Date.now();
    const dt = Math.max(1, now - lastMouse.time);
    const dx = coords.x - lastMouse.x;
    const dy = coords.y - lastMouse.y;
    const speed = Math.hypot(dx, dy) / dt * 16;

    const targetScale = Math.max(0.5, 1 - speed / 25);
    currentScale += (targetScale - currentScale) * 0.15;

    let x = coords.x;
    let y = coords.y;

    if (dx !== 0 || dy !== 0) {
        trailAngle = Math.atan2(dy, dx) * (180 / Math.PI);
    }    

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    circles.forEach((circle, index) => {
        circle.x += (x - circle.x) * 0.2;
        circle.y += (y - circle.y) * 0.2;
        
        const sizeScale = (1 - index * 0.05) * currentScale;
        const radius = 30 * sizeScale;
        
        circle.style.left = (circle.x - coords.x) + "px";
        circle.style.top = (circle.y - coords.y) + "px";
        circle.style.transform = `translate(-50%, -50%) rotate(${trailAngle}deg) scale(${sizeScale})`;
                
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

    if (!hoveringCard) {
        wrapper.style.width = wrapperWidth + "px";
        wrapper.style.height = wrapperHeight + "px";
        wrapper.style.left = wrapperX + "px";
        wrapper.style.top = wrapperY + "px";
        wrapper.style.borderRadius = "10px";
    } else {
        const currentRect = wrapper.getBoundingClientRect();
    
        const lerp = (a, b, t) => a + (b - a) * t;
    
        const padding = 15;
        const newWidth = lerp(currentRect.width, cardTarget.width + padding, 0.15);
        const newHeight = lerp(currentRect.height, cardTarget.height + padding, 0.15);
        const newX = lerp(currentRect.left + currentRect.width / 2, cardTarget.x, 0.15);
        const newY = lerp(currentRect.top + currentRect.height / 2, cardTarget.y, 0.15);
    
        // wrapper.style.width = newWidth + "px";
        // wrapper.style.height = newHeight + "px";
        // wrapper.style.left = newX + "px";
        // wrapper.style.top = newY + "px";
        wrapper.style.borderRadius = "100%";
    }
    
    

    const innerSize = Math.min(wrapperWidth, wrapperHeight) / 3;
    innerCircle.style.width = innerSize + "px";
    innerCircle.style.height = innerSize + "px";

    // this keeps everything centered btw
    // innerCircle.style.left = "50%";
    // innerCircle.style.top = "50%";
    // innerCircle.style.transform = "translate(-50%, -50%)";

    lastMouse.x = coords.x;
    lastMouse.y = coords.y;
    lastMouse.time = now;

    requestAnimationFrame(animateCircles);
}

animateCircles();