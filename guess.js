
var attempts = 5;

var randomNumber =
    Math.floor(Math.random() * 100) + 1;

var guessedCorrectly = false;

var form = document.getElementById("guessForm");
var input = document.getElementById("guessInput");

var attemptsDisplay =
    document.getElementById("attemptsLeft");

var message =
    document.getElementById("message");

var guessButton =
    document.getElementById("guessButton");

var restartButton =
    document.getElementById("restartButton");

var dots =
    document.querySelectorAll(".dot");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    if (guessedCorrectly || attempts <= 0) {
        return;
    }

    var userGuess = Number(input.value);

    if (
        !Number.isInteger(userGuess) ||
        userGuess < 1 ||
        userGuess > 100
    ) {
        showMessage(
            "⚠️ Enter a number between 1 and 100.",
            "warning"
        );
        return;
    }

    attempts--;

    attemptsDisplay.innerText = attempts;

    dots.forEach(function(dot, index) {
        if (index >= attempts) {
            dot.classList.remove("active");
        }
    });

    if (userGuess === randomNumber) {

        guessedCorrectly = true;

        showMessage(
            "🎉 Congratulations! You guessed the number!",
            "success"
        );

        endGame();

    }

    else if (attempts === 0) {

        showMessage(
            "😢 Game Over! Correct number was " + randomNumber,
            "error"
        );

        endGame();

    }

    else if (userGuess > randomNumber) {

        showMessage(
            "⬇️ Too High! Try a smaller number.",
            "warning"
        );

    }

    else {

        showMessage(
            "⬆️ Too Low! Try a bigger number.",
            "warning"
        );

    }

    input.value = "";
});

function showMessage(text, type) {

    message.innerText = text;
    message.className = "message " + type;

}

function endGame() {

    input.disabled = true;
    guessButton.disabled = true;

}

restartButton.addEventListener("click", function() {

    attempts = 5;

    randomNumber =
        Math.floor(Math.random() * 100) + 1;

    guessedCorrectly = false;

    attemptsDisplay.innerText = attempts;

    dots.forEach(function(dot) {
        dot.classList.add("active");
    });

    input.disabled = false;
    guessButton.disabled = false;

    input.value = "";

    showMessage(
        "💡 New game started! Make your guess.",
        ""
    );

});
