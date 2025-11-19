const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

circles.forEach(circle => {
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener("mousemove", e => {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles(){
    let x = coords.x;
    let y = coords.y;

    circles.forEach((circle, index) => {
        circle.style.left = x - circle.offsetWidth / 2 + "px";
        circle.style.top = y - circle.offsetHeight / 2 + "px";
        circle.style.transform = `scale(${1 - index * 0.01})`;
        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.1;
        y += (nextCircle.y - y) * 0.1;
    });

    requestAnimationFrame(animateCircles);
}

animateCircles();