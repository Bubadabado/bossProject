let noiseScale = 0.008;
let points = [];
let defaultAmplitude = 100;
let soundAmplitude = defaultAmplitude;
let spaceBetween = 25;

//let spaceBetween = 20;

let noiseOffset = 0;

function setup() {
  createCanvas(1910, 945);//createCanvas(1650, 1275);

  for(let a = 0; a <= height; a += spaceBetween)
  {
    points[a / spaceBetween] = [];
    for(let i = 0; i < width; i += spaceBetween)
    {
      points[a / spaceBetween][i / spaceBetween] = new noisePoint(i, a);
    }
  }

  //noLoop();
  rectMode(CENTER);

  //audio visualization
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(255);

  let vol = mic.getLevel();
  soundAmplitude = defaultAmplitude + (200 * vol);

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
}

class noisePoint 
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
    this.originalY = y;

    this.noise = noise(x * noiseScale, y * noiseScale); 
    
    this.col = 0;
    //this.y += (this.noise * soundAmplitude);
    //this.angle = angle;
  }

  update()
  {
    this.noise = noise((this.x + noiseOffset) * noiseScale, (this.y + noiseOffset) * noiseScale); 
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