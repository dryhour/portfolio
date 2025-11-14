export default function loop (foldername, images){
    let currentIndex = 0;

    const imageElement = document.getElementById("loop-image");
    const linkElement = document.getElementById("image-link");

    function showNextImage() {
    const img = images[currentIndex];
    imageElement.src = `images/${foldername}/${img}`;
    linkElement.href = `images/${foldername}/${img}`;

    currentIndex = (currentIndex + 1) % images.length;
    }

    showNextImage();
    setInterval(showNextImage, 3000);
}
