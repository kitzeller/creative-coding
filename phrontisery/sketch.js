/**
 * Perlin Noise Flow Field
 * TheCodingTrain
 */

var inc = 0.1;
var scl = 10;
var cols, rows;

var zoff = 0;
var particles = [];
var flowfield;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(HSB, 255);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);

  for (var i = 0; i < 3000; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);
    }
    yoff += inc;

    zoff += 0.0003;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}
