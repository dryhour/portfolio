const coords = { x: 0, y: 0};
const circles = document.querySelectorAll(".circle");

const colors = [
    '#4260f5',
    '#3e59e2',
    '#3a52cf',
    '#364abc',
    '#3243a9',
    '#2e3b96',
    '#2a3483',
    '#262d70',
    '#22265d',
    '#1e1f4a',
    '#1a1737',
    '#161024',
    '#120811',
    '#0e0000',
    '#0a0000',
    '#050000',
    '#000000'
];
const reversedColors = colors.length - 1 - (i % colors.length);

circles.forEach(function(circle, i){
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = reversedColors[i % colors.length];
});

window.addEventListener("mousemove", function(e){
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles(){
    let x = coords.x;
    let y = coords.y;

    circles.forEach(function(circle, index){
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";

        circle.style.scale = (circles.length - index) / circles.length;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
};

animateCircles();