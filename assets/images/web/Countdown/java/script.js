let targetDate;
let fireworksTimeout;

// Update countdown
function updateCountdown() {
  if (!targetDate) return;

  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById("title").textContent = "🎉 Time's Up! 🎉";
    document.getElementById("days").textContent = 0;
    document.getElementById("hours").textContent = 0;
    document.getElementById("minutes").textContent = 0;
    document.getElementById("seconds").textContent = 0;
    startFireworks();
    return;
  }

  document.getElementById("days").textContent =
    Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById("hours").textContent =
    Math.floor((diff / (1000 * 60 * 60)) % 24);
  document.getElementById("minutes").textContent =
    Math.floor((diff / (1000 * 60)) % 60);
  document.getElementById("seconds").textContent =
    Math.floor((diff / 1000) % 60);
}

// Preset buttons
function setChristmas() {
  const year = new Date().getFullYear();
  targetDate = new Date(`December 25, ${year} 00:00:00`);
  if (targetDate < new Date()) {
    targetDate = new Date(`December 25, ${year + 1} 00:00:00`);
  }
  document.getElementById("title").textContent = "🎄 Countdown to Christmas 🎄";
  document.getElementById("customInput").style.display = "none";
}

function setNewYear() {
  const year = new Date().getFullYear() + 1;
  targetDate = new Date(`January 1, ${year} 00:00:00`);
  document.getElementById("title").textContent = "🎆 Countdown to New Year 🎆";
  document.getElementById("customInput").style.display = "none";
}

function setBirthday() {
  document.getElementById("title").textContent = "🎂 Countdown to Birthday 🎂";
  document.getElementById("customInput").style.display = "block";
  document.getElementById("inputLabel").textContent = "Select date:";
  document.getElementById("customDate").style.display = "inline-block";
  document.getElementById("customTime").style.display = "none";
}

function setAnything() {
  document.getElementById("title").textContent = "✨ Countdown to Your Event ✨";
  document.getElementById("customInput").style.display = "block";
  document.getElementById("inputLabel").textContent = "Select time:";
  document.getElementById("customDate").style.display = "none";
  document.getElementById("customTime").style.display = "inline-block";
}

// Apply custom input
function applyCustom() {
  const dateValue = document.getElementById("customDate").value;
  const timeValue = document.getElementById("customTime").value;

  if (dateValue) {
    targetDate = new Date(dateValue + "T00:00:00");
  }

  if (timeValue) {
    const now = new Date();
    const [h, m] = timeValue.split(":");
    targetDate = new Date();
    targetDate.setHours(h, m, 0, 0);
    if (targetDate <= now) {
      targetDate.setDate(targetDate.getDate() + 1);
    }
  }
}

// Fireworks
function startFireworks() {
  const canvas = document.getElementById("fireworksCanvas");
  const ctx = canvas.getContext("2d");
  canvas.style.display = "block";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createFirework() {
    const x = random(0, canvas.width);
    const y = random(0, canvas.height / 2);
    for (let i = 0; i < 50; i++) {
      particles.push({
        x, y,
        angle: random(0, Math.PI * 2),
        speed: random(2, 6),
        life: random(50, 100),
        color: `hsl(${random(0, 360)},100%,50%)`
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.life--;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
      if (p.life <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(animate);
  }

  fireworksTimeout = setInterval(createFirework, 500);
  animate();

  setTimeout(() => {
    clearInterval(fireworksTimeout);
    canvas.style.display = "none";
  }, 15000);
}

setInterval(updateCountdown, 1000);
