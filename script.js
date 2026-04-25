let index = 0;
let score = 0;          // marks (5 each)
let correctCount = 0;  // count like 1/20
let answered = false;

// LOAD QUESTION
function loadQuestion() {
  if (!quiz || quiz.length === 0) {
    console.log("Quiz not loaded");
    return;
  }

  let q = quiz[index];
  answered = false;

  document.getElementById("question").innerText = q.q;
  document.getElementById("qCount").innerText =
    `Question ${index + 1} of ${quiz.length}`;

  let html = "";
  q.options.forEach(opt => {
    html += `<button onclick="selectAnswer('${opt}', this)">${opt}</button>`;
  });

  document.getElementById("options").innerHTML = html;
  document.getElementById("feedback").innerText = "";

  updateProgress();
}

// SELECT ANSWER
function selectAnswer(ans, btn) {
  if (answered) return;
  answered = true;

  let q = quiz[index];
  let buttons = document.querySelectorAll("#options button");

  buttons.forEach(b => {
    if (b.innerText === q.answer) {
      b.style.background = "green";
      b.style.color = "#fff";
    } else if (b.innerText === ans) {
      b.style.background = "red";
      b.style.color = "#fff";
    } else {
      b.style.background = "#ddd";
    }
  });

  if (ans === q.answer) {
    score += 5;
    correctCount++;
    showFeedback("Very Good! 🎉", true);
    launchFireworks();
  } else {
    showFeedback("Try Again ❌", false);
  }

  updateLiveScore(); // ✅ update after each answer
}

// LIVE SCORE
function updateLiveScore() {
  document.getElementById("liveScore").innerText =
    `Score: ${correctCount}/${quiz.length}`;
}

// FEEDBACK
function showFeedback(msg, correct) {
  let fb = document.getElementById("feedback");
  fb.innerText = msg;
  fb.style.color = correct ? "green" : "red";
}

// NEXT BUTTON
document.getElementById("nextBtn").onclick = function () {
  if (!answered) {
    alert("Select answer first");
    return;
  }

  index++;

  if (index < quiz.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

// RESULT
function showResult() {
  document.getElementById("quizBox").classList.add("hidden");
  document.getElementById("nextBtn").classList.add("hidden");
  document.getElementById("resultBox").classList.remove("hidden");

  let msg = "";

  if (score === quiz.length * 5) {
    msg = "Excellent 🌟";
    launchFireworks();
  } else if (score >= (quiz.length * 5) / 2) {
    msg = "Good 👍";
  } else {
    msg = "Keep Practicing 💪";
  }

  document.getElementById("finalScore").innerText =
    `Correct: ${correctCount}/${quiz.length} | Marks: ${score}/${quiz.length * 5} - ${msg}`;
}

// RESTART
document.getElementById("restartBtn").onclick = function () {
  index = 0;
  score = 0;
  correctCount = 0;

  document.getElementById("resultBox").classList.add("hidden");
  document.getElementById("quizBox").classList.remove("hidden");
  document.getElementById("nextBtn").classList.remove("hidden");

  updateLiveScore();
  loadQuestion();
};

// PROGRESS
function updateProgress() {
  let percent = ((index + 1) / quiz.length) * 100;
  document.getElementById("progressBar").style.width = percent + "%";
}

// FIREWORKS
function launchFireworks() {
  const colors = ["#ff5252", "#ffeb3b", "#40c4ff", "#69f0ae", "#ff4081"];

  for (let i = 0; i < 10; i++) {
    let rocket = document.createElement("div");

    rocket.style.position = "fixed";
    rocket.style.width = "6px";
    rocket.style.height = "6px";
    rocket.style.background = colors[Math.floor(Math.random() * colors.length)];
    rocket.style.bottom = "0px";
    rocket.style.left = Math.random() * window.innerWidth + "px";
    rocket.style.borderRadius = "50%";

    document.body.appendChild(rocket);

    let pos = 0;
    let fly = setInterval(() => {
      pos += 8;
      rocket.style.bottom = pos + "px";

      if (pos > window.innerHeight * 0.6) {
        clearInterval(fly);
        rocket.remove();
      }
    }, 20);
  }
}

// START
updateLiveScore();
loadQuestion();