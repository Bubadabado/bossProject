let noiseScale = 0.008;
let overlayNoiseScale = 0.002;

let points = [];
let defaultAmplitude = 100;//140;
let soundAmplitude = defaultAmplitude;
let spaceBetween = 25;

//let spaceBetween = 20;

let noiseOffset = 0;
let overlayNoiseOffset = 0;

function setup() {
  createCanvas(windowWidth - 10, windowHeight - 20); //1910, 945);

  //scale the space between based on the size of the display, with a minimum of 25
  spaceBetween = max(25, round((windowWidth / 1910) * 25));

  for(let a = 0; a <= height; a += spaceBetween)
  {
    points[a / spaceBetween] = [];
    for(let i = 0; i < width + spaceBetween; i += spaceBetween)
    {
      points[a / spaceBetween][i / spaceBetween] = new noisePoint(i, a);
    }
  }

  //noLoop();
  rectMode(CENTER);

  //audio visualization
  //mic = new p5.AudioIn();
  //mic.start();
}

function draw() {
  background(255);

  //let vol = mic.getLevel();
  //soundAmplitude = defaultAmplitude + (200 * vol);

  for(let i = 1; i < points.length; i++)
  {
    for(let a = 1; a < points[i].length; a++)
    {
      points[i][a].update();
      stroke(points[i][a].col);//stroke(10);
      line(points[i][a].x, points[i][a].y, points[i][a - 1].x, points[i][a - 1].y);
      line(points[i][a].x, points[i][a].y, points[i - 1][a - 1].x, points[i - 1][a - 1].y);
      //line(points[i][a].x, points[i][a].y, points[i + 1][a + 1].x, points[i + 1][a + 1].y);
      //points[i][a].draw();
    }
  }
  noiseOffset += 1;
  overlayNoiseOffset -= 1;
}

class noisePoint 
{
  constructor(x, y)
  {
    this.x = x - spaceBetween; //offset first set of points to remove static artifact
    this.y = y;
    this.originalY = y;

    this.noise = noise(x * noiseScale, y * noiseScale) * noise(x * overlayNoiseScale, y * overlayNoiseScale); 
    
    this.col = 0;
    //this.y += (this.noise * soundAmplitude);
    //this.angle = angle;
  }

  update()
  {
    this.noise = noise((this.x + noiseOffset) * noiseScale, (this.y + noiseOffset) * noiseScale);// * noise((this.x + overlayNoiseOffset) * overlayNoiseScale, (this.y + overlayNoiseOffset) * overlayNoiseScale);
    this.y = this.originalY + ((this.noise - 0.5) * soundAmplitude);
    this.col = 255 - (this.noise * 255);
  }
  
  draw()
  {

    fill(255 - (this.noise * 255));
    //point(this.x, this.y);
    noStroke();
    //circle(this.x, this.y, spaceBetween);
    rect(this.x, this.y, spaceBetween, spaceBetween);
  }
}
