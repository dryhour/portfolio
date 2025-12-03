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


document.querySelectorAll('button, .resume-button, .icons a, .skill').forEach(el => {
    el.addEventListener('mouseenter', () => {
        const rect = el.getBoundingClientRect();
        hoveringCard = true;
        cardTarget.x = rect.left + rect.width / 2;
        cardTarget.y = rect.top + rect.height / 2;
        cardTarget.width = rect.width;
        cardTarget.height = rect.height;

        wrapper.style.borderRadius = "10px";
    });

    el.addEventListener('mouseleave', () => {
        hoveringCard = false;

        wrapper.style.borderRadius = "100%";
    });
});

carousel.addEventListener('wheel', e => {
    e.preventDefault();
}, { passive: false });

function animateCircles() {
    const now = Date.now();
    const tween = 0.15;

    lastMouse.x += (coords.x - lastMouse.x) * tween;
    lastMouse.y += (coords.y - lastMouse.y) * tween;

    let targetWidth = 35;
    let targetHeight = 35;
    let targetX = lastMouse.x;
    let targetY = lastMouse.y;

    if (hoveringCard) {
        const padding = 15;
        targetWidth = cardTarget.width + padding;
        targetHeight = cardTarget.height + padding;
        targetX = cardTarget.x;
        targetY = cardTarget.y;
    }

    const lerp = (a, b, t) => a + (b - a) * t;

    wrapper.style.width = lerp(wrapper.offsetWidth, targetWidth, tween) + "px";
    wrapper.style.height = lerp(wrapper.offsetHeight, targetHeight, tween) + "px";
    wrapper.style.left = lerp(parseFloat(wrapper.style.left || 0), targetX, tween) + "px";
    wrapper.style.top = lerp(parseFloat(wrapper.style.top || 0), targetY, tween) + "px";

    let x = parseFloat(wrapper.style.left || 0);
    let y = parseFloat(wrapper.style.top || 0);

    circles.forEach((circle, index) => {
        const circleTween = tween * Math.pow(0.8, index);
        circle.x += (x - circle.x) * circleTween;
        circle.y += (y - circle.y) * circleTween;
    
        const scale = 1 - index * 0.05;
    
        circle.style.left = Math.round(circle.x) + "px";
        circle.style.top = Math.round(circle.y) + "px";
        circle.style.transform = `translate(-50%, -50%) scale(${scale})`;
    
        x = circle.x;
        y = circle.y;
    });

    lastMouse.time = now;
    requestAnimationFrame(animateCircles);
}

animateCircles();
