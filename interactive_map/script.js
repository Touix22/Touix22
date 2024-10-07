const buttons = document.querySelectorAll('.button');

const buttonImages = {
    button1: {
        default: 'images/mobs_b.png',
        clicked: 'images/mobs.png',
    },
    button2: {
        default: 'images/map_b.png',
        clicked: 'images/map.png',
    },
    button3: {
        default: 'images/chest_b.png',
        clicked: 'images/chest.png',
    },
    button4: {
        default: 'images/soon_b.png',
        clicked: 'images/soon.png',
    }
};

const soundPath = 'button_sound.mp3';
const clickSound = new Audio(soundPath);

const container = document.getElementById('container');
const image = document.getElementById('image');

let currentX = 0, currentY = 0;
let isDragging = false;
let startX, startY;
let scale = 1;
let currentButton = null;

container.addEventListener('mousedown', function(event) {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    event.preventDefault();
});

document.addEventListener('mousemove', function(event) {
    if (isDragging) {
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;

        currentX += dx;
        currentY += dy;

        startX = event.clientX;
        startY = event.clientY;

        updateTransform();
    }
});

document.addEventListener('mouseup', function() {
    isDragging = false;
});

function updateTransform() {
    image.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
}

container.addEventListener('wheel', function(event) {
    event.preventDefault();
    const zoomIntensity = 0.1;

    if (event.deltaY < 0) {
        scale += zoomIntensity;
    } else {
        scale = Math.max(1, scale - zoomIntensity);
    }

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    currentX = (screenWidth / 2 - screenWidth / 2 * scale);
    currentY = (screenHeight / 2 - screenHeight / 2 * scale);

    updateTransform();
});

buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.stopPropagation();

        if (currentButton && currentButton !== this) {
            currentButton.style.backgroundImage = `url(${buttonImages[currentButton.id].default})`;
            currentButton.disabled = false;
        }

        if (currentButton === this) {
            return;
        }

        this.style.backgroundImage = `url(${buttonImages[this.id].clicked})`;
        this.disabled = true;

        clickSound.pause();
        clickSound.currentTime = 0;
        clickSound.play();

        currentButton = this;
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const defaultButton = document.getElementById('button2');
    if (defaultButton) {
        defaultButton.click();
    }
});
