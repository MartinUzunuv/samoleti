x = window.innerWidth / 100;
y = window.innerHeight / 100;

my = { x: 50, y: 90 };

function draw(ctx,teammates,bullets) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  bullets.forEach(bullet => {
    if(bullet.owner !== null){
        ctx.fillStyle = "white";
    }else{
        ctx.fillStyle = "red";
    }
    ctx.fillRect(bullet.x * x - 1 * x, bullet.y * y - 1 * x, 2 * x, 2 * y);
  });
  ctx.fillStyle = "green";
  teammates.forEach(teammate => {
    ctx.fillRect(teammate.x * x - 5 * x, teammate.y * y - 5 * x, 10 * x, 10 * y);
  });
  ctx.fillStyle = "blue";
  ctx.fillRect(my.x * x - 5 * x, my.y * y - 5 * x, 10 * x, 10 * y);
}

function game(ctx, sesion) {
  socket.emit("sesion", sesion);

  setInterval(() => {
    if (isWKeyPressed) {
      if (my.y > 10) {
        my.y -= 0.5 * y;
      }
      isWKeyPressed = false;
    }
    if (isSKeyPressed) {
      if (my.y < 94) {
        my.y += 0.5 * y;
      }
      isSKeyPressed = false;
    }
    if (isAKeyPressed) {
      if (my.x > 6) {
        my.x -= 0.5 * x;
      }
      isAKeyPressed = false;
    }
    if (isDKeyPressed) {
      if (my.x < 94) {
        my.x += 0.5 * x;
      }
      isDKeyPressed = false;
    }
    socket.emit("updateMe", {my:my, sesion:sesion}, (response) => {
      //console.log(response);
      draw(ctx,response.teammates, response.bullets);
    });
  }, 50);
}
