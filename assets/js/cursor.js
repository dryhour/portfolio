const coords = { x: 0, y: 0};
const circles = document.querySelectorAll(".circle");

const colors = [
    '#000000',
    '#050000',
    '#0a0000',
    '#0e0000',
    '#120811',
    '#161024',
    '#1a1737',
    '#1e1f4a',
    '#22265d',
    '#262d70',
    '#2a3483',
    '#2e3b96',
    '#3243a9',
    '#364abc',
    '#3a52cf',
    '#3e59e2',
    '#4260f5'
];

circles.forEach(function(circle, i){
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = colors[i % colors.length];
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