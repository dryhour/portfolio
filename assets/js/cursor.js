const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");
let lastMouse = { x: 0, y: 0 };

circles.forEach(c => {
    c.x = 0;
    c.y = 0;
    c.scale = 1;
    c.style.transform = "translate(-50%, -50%) scale(1)";
    c.style.left = "0px";
    c.style.top = "0px";
});

window.addEventListener("mousemove", e => {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach((circle, i) => {
        circle.style.left = x + "px";
        circle.style.top = y + "px";

        const speed = Math.hypot(coords.x - lastMouse.x, coords.y - lastMouse.y);
        const targetScale = Math.max(0.4, 1 - speed / 500);
        circle.scale += (targetScale - circle.scale) * 0.2;

        circle.style.transform = `translate(-50%, -50%) scale(${circle.scale})`;

        circle.x = x;
        circle.y = y;

        const next = circles[i + 1] || circles[0];
        x += (next.x - x) * 0.15;
        y += (next.y - y) * 0.15;
    });

    lastMouse.x = coords.x;
    lastMouse.y = coords.y;

    requestAnimationFrame(animateCircles);
}

animateCircles();
