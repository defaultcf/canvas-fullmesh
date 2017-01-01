//初期化
var screenWidth = 0, screenHeight = 0;
var canvas, ctx;
var Ball = function() {
  this.x = getRandom(0, screenWidth);
  this.y = getRandom(0, screenHeight);
  this.r = 5;
  this.a = getRandom(0, 360) * (2 * Math.PI / 360);
  this.speed = 0.5;
};
var balls = [];
var balls_num = 0;

//読み込み時に実行
window.onload = function() {
  console.log("Ready");
  canvas = document.getElementById('i-my-me');
  if(!canvas.getContext) {
    alert("HTML5 Canvasに非対応のブラウザをお使いのため、当サイトは正常に表示されない恐れがあります。");
    return;
  }
  ctx = canvas.getContext('2d');
  getScreensize();
  balls_num = (screenWidth * screenHeight) / 10000;
  for(var i = 0; i < balls_num; i++) {
    balls.push(new Ball());
  }
  window.requestAnimationFrame(draw);
};

//リサイズ時に実行
window.onresize = function() {
  getScreensize();
};

function draw() {
  ctx.clearRect(0, 0, screenWidth, screenHeight);
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  //点の描画
  for(var i = 0; i < balls.length; i++) {
    let ball = balls[i];
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2, true);
    ctx.fill();
    ball.x += Math.cos(ball.a) * ball.speed;
    ball.y += Math.sin(ball.a) * ball.speed;
    if(ball.x < 0 - 100) ball.x = screenWidth + 100;
    if(ball.y < 0 - 100) ball.y = screenHeight + 100;
    if(ball.x > screenWidth + 100) ball.x = 0 - 100;
    if(ball.y > screenHeight + 100) ball.y = 0 - 100;

    //線の描画
    for(var j = balls.length - 1; j > i; j--) {
      let n_ball = balls[j];
      let d = Math.sqrt(Math.pow(ball.x - n_ball.x, 2) + Math.pow(ball.y - n_ball.y, 2));
      if(d < Math.min(screenWidth, screenHeight) / 2) {
        ctx.lineWidth = balls_num / (d * 3);
        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y);
        ctx.lineTo(n_ball.x, n_ball.y);
        ctx.stroke();
      }
    }
  }
  window.requestAnimationFrame(draw);
}

/**
* スクリーンサイズ取得
*/
function getScreensize() {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  canvas.setAttribute('width', screenWidth);
  canvas.setAttribute('height', screenHeight);
}

/**
* デバッグする
* @param {string} s 表示するメッセージ
*/
function debug(s) {
  console.log(s);
}

/**
* minからmaxまでの乱数を返す
* @param {number} min 最小値
* @param {number} max 最大値
*/
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
