let index = 0;
let score = 0;
let answered = false;

// LOAD QUESTION
function loadQuestion() {
  if (!quiz || quiz.length === 0) {
    console.log("Quiz data not loaded");
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
    score += 5; // ✅ 5 marks per correct answer
    showFeedback("Very Good! 🎉", true);
    launchFireworks();
  } else {
    showFeedback("Try Again ❌", false);
  }
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
    `Score: ${score}/${quiz.length * 5} - ${msg}`;
}

// RESTART
document.getElementById("restartBtn").onclick = function () {
  index = 0;
  score = 0;

  document.getElementById("resultBox").classList.add("hidden");
  document.getElementById("quizBox").classList.remove("hidden");
  document.getElementById("nextBtn").classList.remove("hidden");

  loadQuestion();
};

// PROGRESS BAR
function updateProgress() {
  let percent = ((index + 1) / quiz.length) * 100;
  document.getElementById("progressBar").style.width = percent + "%";
}

// FIREWORKS
function launchFireworks() {
  const colors = ["#ff5252", "#ffeb3b", "#40c4ff", "#69f0ae", "#ff4081"];

  for (let i = 0; i < 12; i++) {
    let rocket = document.createElement("div");

    rocket.style.position = "fixed";
    rocket.style.width = "6px";
    rocket.style.height = "6px";
    rocket.style.background = colors[Math.floor(Math.random() * colors.length)];
    rocket.style.bottom = "0px";
    rocket.style.left = Math.random() * window.innerWidth + "px";
    rocket.style.borderRadius = "50%";
    rocket.style.zIndex = 9999;

    document.body.appendChild(rocket);

    let speed = Math.random() * 5 + 5;
    let pos = 0;

    let fly = setInterval(() => {
      pos += speed;
      rocket.style.bottom = pos + "px";

      if (pos > window.innerHeight * 0.6) {
        clearInterval(fly);
        burst(rocket.style.left, rocket.style.bottom, rocket.style.background);
        rocket.remove();
      }
    }, 20);
  }
}

// BURST EFFECT
function burst(x, y, color) {
  for (let i = 0; i < 15; i++) {
    let dot = document.createElement("div");

    dot.style.position = "fixed";
    dot.style.width = "6px";
    dot.style.height = "6px";
    dot.style.background = color;
    dot.style.left = x;
    dot.style.bottom = y;
    dot.style.borderRadius = "50%";
    dot.style.zIndex = 9999;

    document.body.appendChild(dot);

    let angle = Math.random() * 2 * Math.PI;
    let velocity = Math.random() * 5 + 2;

    let dx = Math.cos(angle) * velocity;
    let dy = Math.sin(angle) * velocity;

    let xPos = parseFloat(x);
    let yPos = parseFloat(y);

    let move = setInterval(() => {
      xPos += dx;
      yPos += dy;
      dy -= 0.2;

      dot.style.left = xPos + "px";
      dot.style.bottom = yPos + "px";

      if (yPos <= 0) {
        clearInterval(move);
        dot.remove();
      }
    }, 20);
  }
}

// START QUIZ
loadQuestion();