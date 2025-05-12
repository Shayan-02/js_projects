document.addEventListener("DOMContentLoaded", () => {
  const startGameButton = document.getElementById("startGame");
  const submitGuessButton = document.getElementById("submitGuess");
  const gameForm = document.getElementById("gameForm");
  const guessForm = document.getElementById("guessForm");
  const attemptsLeftText = document.getElementById("attemptsLeft");

  let randomNumber;
  let attemptsLeft = 5;

  startGameButton.addEventListener("click", () => {
    const start = parseInt(document.getElementById("start").value);
    const end = parseInt(document.getElementById("end").value);

    if (isNaN(start) || isNaN(end) || start >= end) {
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "لطفاً بازه صحیحی وارد کنید.",
      });
      return;
    }

    randomNumber = Math.floor(Math.random() * (end - start + 1)) + start;
    attemptsLeft = 5;
    attemptsLeftText.textContent = `شانس‌های باقی‌مانده: ${attemptsLeft}`;
    gameForm.style.display = "none";
    guessForm.style.display = "block";
  });

  submitGuessButton.addEventListener("click", () => {
    const guess = parseInt(document.getElementById("guess").value);

    if (isNaN(guess)) {
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "لطفاً یک عدد وارد کنید.",
      });
      return;
    }

    attemptsLeft--;

    if (guess === randomNumber) {
      Swal.fire({
        icon: "success",
        title: "تبریک!",
        text: "شما برنده شدید!",
      }).then(() => {
        resetGame();
      });
    } else if (attemptsLeft <= 0) {
      Swal.fire({
        icon: "error",
        title: "باختید!",
        text: `عدد صحیح ${randomNumber} بود.`,
      }).then(() => {
        resetGame();
      });
    } else {
      const message =
        guess > randomNumber ? "عدد صحیح کوچکتر است." : "عدد صحیح بزرگتر است.";
      Swal.fire({
        icon: "info",
        title: "حدس اشتباه",
        text: message,
      });
      attemptsLeftText.textContent = `شانس‌های باقی‌مانده: ${attemptsLeft}`;
    }
    document.getElementById("guess").value = "";
  });

  function resetGame() {
    gameForm.style.display = "block";
    guessForm.style.display = "none";
    attemptsLeftText.textContent = "";
    document.getElementById("start").value = "";
    document.getElementById("end").value = "";
    document.getElementById("guess").value = "";
  }
});

