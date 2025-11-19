const coords = { x: 0, y: 0 };
const wrapper = document.querySelector(".cursor-wrapper");
const circles = document.querySelectorAll(".circle");
let lastMouse = { x: 0, y: 0 };

circles.forEach(c => { c.x = 0; c.y = 0; });

window.addEventListener("mousemove", e => {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach((circle, index) => {
        circle.style.left = x + "px";
        circle.style.top = y + "px";
        circle.style.transform = `translate(-50%, -50%) scale(${1 - index * 0.02})`;
        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.15;
        y += (nextCircle.y - y) * 0.15;
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

    const dx = coords.x - lastMouse.x;
    const dy = coords.y - lastMouse.y;
    const speed = Math.hypot(dx, dy);

    const angle = Math.atan2(dy, dx);
    const exaggeration = Math.min(2, speed / 20 + 1); // exaggerate stretch

    const scaleX = Math.cos(angle) * exaggeration * 0.5 + 0.5; 
    const scaleY = Math.sin(angle) * exaggeration * 0.5 + 0.5; 

    wrapper.style.transform = `translate(-50%, -50%) scaleX(${scaleX}) scaleY(${scaleY})`;

    lastMouse.x = coords.x;
    lastMouse.y = coords.y;

    requestAnimationFrame(animateCircles);
}

animateCircles();