var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;




const mouse = {x: innerWidth /2, y: innerHeight/2};

const color_array1 = ['#004358','#1F8A70','#BEDB39','#FFE11A','#FD7400']; 
const color_array2 = ['#557BA3','#9ECEFF','#3B667D','#93D2D8','#FFA594'];
const color_array3 = ['#A31D5F','#BC1AF0','#7F57FF','#4371E8','#4AD8FF'];
const color_array4 = ['#25064D','#36175E','#553285','#7B52AB','#9768D1'];
const color_array5 = ['#52656B','#FF3B77','#CDFF00','#FFFFFF','#B8B89F'];
const colors = [color_array1,color_array2,color_array3,color_array4,color_array5];


canvas.addEventListener('mousemove', event => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    }
);

window.addEventListener('resize', 
    function () {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;

        init();
    }
);

// Random Integer from a range
function randomIntFromRange(lower, upper) {
    return lower + Math.random() * (upper-lower);
}

// Create Particle Object
function Particle(x, y, radius, color,color_array) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color_array = color_array
    this.color_index = Math.round(Math.random() * 4)
    this.color = this.color_array[this.color_index];
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.02;
    this.distance_from_centre = randomIntFromRange(200, 400);
    this.last_mouse = {x: x, y: y}


    this.update = () => {
        const last_point = {x: this.x, y: this.y};
        this.radians += this.velocity;

        // Drag Effect 
        this.last_mouse.x += (mouse.x - this.last_mouse.x) * 0.05;
        this.last_mouse.y += (mouse.y - this.last_mouse.y) * 0.05;   

        this.x = this.last_mouse.x + Math.cos(this.radians) * this.distance_from_centre;
        this.y = this.last_mouse.y + Math.sin(this.radians) * this.distance_from_centre;
        this.draw(last_point);
    }

    this.draw = last_point => {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(last_point.x, last_point.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    }
}

// Implementation 
let particles;

function init() {
    particles = [];
    var particle_colours = colors[Math.round(Math.random() * (colors.length-1))];
    for (let i=0; i < 100; i++) {
        const radius = randomIntFromRange(10,20);
        particles.push(new Particle(canvas.width / 2, canvas.height /2, radius, 'blue',particle_colours))
    }
    console.log(particles);
}

// Animation 
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.05'
    c.fillRect(0, 0, canvas.width, canvas.height);

    // Text
    c.font = "48px Bungee";
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillStyle = 'white';
    c.textAlign = "center";
    c.fillText('Circular Motion', canvas.width / 2, canvas.height /2);

    particles.forEach(particle => { 
        particle.update();
    })
}

init();

animate();
