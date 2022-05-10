import vars from "../../js-modules/vars.js";
import Bird from "../../js-modules/bird.js";
import Ground from "../../js-modules/ground.js";
import Column from "../../js-modules/column.js";

let frame = 0; //frame number in current second
let score = 0;

const canvasElement = document.getElementById("c");
const context = canvasElement.getContext("2d");

const canvasHeight = Math.floor(window.innerHeight);
const canvasWidth = Math.floor(canvasHeight * 9/16);
canvasElement.width = canvasWidth;
canvasElement.height = canvasHeight;

// calculate gravity
// in 5 seconds gravity must pull bird to top to bottom
vars.GRAVITY = Math.floor(canvasHeight / (-1 * 5 * vars.FPS));

//sprite
const sprite = new Image();
sprite.src = "sprites.png";

//game elements
const bird = new Bird(context, sprite);
const ground = new Ground(context, sprite);
const column = new Column(context, sprite);

// bind event on column revive to increase score
column.onRevive = increaseScore;

canvasElement.onclick = () => {
  bird.jump();
}

const gameInterval = setInterval(() => {
  // clear canvas
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  // draw bird
  bird.draw(frame);

  // draw ground
  ground.draw(frame)

  // draw columns
  column.draw(frame)

   // check if bird touched ground
   if(bird.isTouchingGround(ground)) {
    if (window.confirm(`Game Over. Your score is ${score}. Do you want to make another one ?`)){
      clearInterval(gameInterval);
      window.location.reload()
    }
}

// check if bird touched columns
if(bird.isTouchingColumns(column)) {
  if (window.confirm(`Game Over. Your score is ${score}. Do you want to make another one ?`)){
    clearInterval(gameInterval);
    window.location.reload()
}
}
// print score
context.fillStyle = "black";
context.textAlign = "center";
context.font = "38px Arial";
context.fillText(score, canvasWidth/2, 40);

frame = (frame + 1) % vars.FPS;

}, 1000 / vars.FPS);

function increaseScore() {
  score += 1;
}