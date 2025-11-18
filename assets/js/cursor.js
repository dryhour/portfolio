const coords = { x: 0, y: 0};
const circles = document.querySelectorAll(".circle");

const colors = [
    '#142850',
    '#143c66',
    '#12587d',
    '#0f7d96',
    '#0aacb0',
    '#04ccb1'
];

circles.forEach(function(circle, i){
    circle.x = 0;
    circle.y = 0;
    circle.style.BackgroundColor = colors[i % colors.length];
});

window.addEventListener("mousemove", function(e){
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles(){
    let x = coords.x;
    let y = coords.y;

    circles.forEach(function(circle, index){
        circle.style.left = coords.x - 12 + "px";
        circle.style.top = coords.y - 12 + "px";

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