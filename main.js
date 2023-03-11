main = document.getElementById("main");
submitButton = document.getElementById("submit-button");

username = "";

isWKeyPressed = false;
isSKeyPressed = false;
isAKeyPressed = false;
isDKeyPressed = false;

document.addEventListener('keydown', function(event) {
  if (event.key === 'w' || event.key === 'W') {
    isWKeyPressed = true;
  }
  if (event.key === 's' || event.key === 'S') {
    isSKeyPressed = true;
  }
  if (event.key === 'a' || event.key === 'A') {
    isAKeyPressed = true;
  }
  if (event.key === 'd' || event.key === 'D') {
    isDKeyPressed = true;
  }
});


submitButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  const nameInput = document.getElementById("name");
  username = nameInput.value;
  console.log(`Hello, ${username}!`);
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;;
  main.appendChild(canvas);
  ctx = canvas.getContext("2d");
  game(ctx, username)
});
