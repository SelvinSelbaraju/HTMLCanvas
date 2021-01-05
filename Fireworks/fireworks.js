const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const mouse = {
    x: canvas.width /2,
    y: canvas.height / 2
}

addEventListener('resize', function(event) {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});

const gravity = 0.01;
const friction = 0.99;

class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }
    
    draw() {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI *2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        c.restore();
    }

    update() {
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.velocity.y += gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.005;
    }
}

let particles;

function init() {
    particles = []
    
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.05)';
    c.fillRect(0,0, canvas.width, canvas.height);

    // Text 
    c.font = '100px Amatic SC';
    c.fillStyle = 'white';
    c.textAlign = 'center';
    c.fillText('Fireworks', canvas.width /2, canvas.height /2);
    
    particles.forEach((particle, i) => {
        if (particle.alpha > 0) {
        particle.update();
        }
        else {
            particles.splice(i, 1)
        } 
    });

}

init()
animate()

addEventListener('click', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    const power = 5;
    const particleCount = 200;
    const angleIncrement = (Math.PI * 2) / particleCount;
    for (let i = 0; i < particleCount; i++) {
        if (particles.length < 1000) {
        particles.push(new Particle(mouse.x,mouse.y, 3, `hsl(${Math.random() * 360}, 50%, 50%)`, {x: Math.cos(angleIncrement* i) * Math.random() * power, y: Math.sin(angleIncrement *i) * Math.random() * power}))         
        }
    }
    console.log(particles);
}) 
