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
    const dt = Math.max(1, now - lastMouse.time);
    const dx = coords.x - lastMouse.x;
    const dy = coords.y - lastMouse.y;

    if (dx !== 0 || dy !== 0) {
        trailAngle = Math.atan2(dy, dx) * (180 / Math.PI);
    }

    let x = coords.x;
    let y = coords.y;

    circles.forEach(circle => {
        circle.x += (x - circle.x) * 0.2;
        circle.y += (y - circle.y) * 0.2;

        circle.style.left = (circle.x - coords.x) + "px";
        circle.style.top = (circle.y - coords.y) + "px";
        circle.style.transform = `translate(-50%, -50%) rotate(${trailAngle}deg) scale(1)`;

        x = circle.x;
        y = circle.y;
    });

    lastMouse.x = coords.x;
    lastMouse.y = coords.y;
    lastMouse.time = now;

    requestAnimationFrame(animateCircles);
}


animateCircles();