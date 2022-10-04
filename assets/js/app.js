let min = 1,
  max = 10,
  winning_num = getRandomNum(min, max),
  guesses_left = 3;

const game = document.querySelector("#game"),
  min_num = document.querySelector(".min-num"),
  max_num = document.querySelector(".max-num"),
  guess_input = document.querySelector("#guess-input"),
  guess_btn = document.querySelector("#guess-btn"),
  message = document.querySelector(".message");

min_num.textContent = min;
max_num.textContent = max;

guess_btn.addEventListener("click", guess);

game.addEventListener("mousedown", function(e) {
   if (e.target.className === "play-again") {
      window.location.reload();
   }
});

function guess() {
  let guess_num = parseInt(guess_input.value);
  if (isNaN(guess_num) || guess_num < min || guess_num > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
    guess_input.style.borderColor = "red";
  } else {
    if (guess_num === winning_num) {
      guess_input.disabled = true;
      guess_input.style.borderColor = "green";
      setMessage(`${winning_num} is correct, YOU WIN!`, "green");
      gameOver(true, `${winning_num} is correct, YOU WIN!`);
    } else {
      guesses_left--;
      if (guesses_left === 0) {
        gameOver(false,`Game Over, you lost. The correct number was ${winning_num}`);
        guess_input.value = "";
      } else {
        setMessage(
          `${guess_num} is not correct, ${guesses_left} guesses left`,
          "red"
        );
        guess_input.value = "";
      }
    }
  }
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

function getRandomNum(min, max) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}

function gameOver(is_won, message) {
  let color = is_won ? "green" : "red";
  guess_input.disabled = true;
  guess_input.style.borderColor = color;
  setMessage(message, color);

   guess_btn.value = "Play Again";
   guess_btn.className = "play-again";
}
