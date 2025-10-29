// Handle section switching
const menuItems = document.querySelectorAll(".menu-item");
const sections = document.querySelectorAll(".section");

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    menuItems.forEach(btn => btn.classList.remove("active"));
    item.classList.add("active");

    const target = item.getAttribute("data-section");
    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(target).classList.add("active");
  });
});

// Simple mood trend chart
const ctx = document.getElementById("moodChart");
if (ctx) {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{
        label: "Mood Score",
        data: [70, 75, 65, 68, 72, 60, 78],
        borderColor: "#a30000",
        tension: 0.4,
        fill: false
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { min: 50, max: 100 } }
    }
  });
}

// Voice Analyzer Button (placeholder)
const recordBtn = document.querySelector(".record-btn");
const statusText = document.querySelector(".status");

if (recordBtn) {
  recordBtn.addEventListener("click", () => {
    statusText.textContent = "Status: Listening...";
    recordBtn.textContent = "🔴 Recording...";
    recordBtn.disabled = true;

    setTimeout(() => {
      statusText.textContent = "Status: Analysis Complete — Detected Calm Tone 😌";
      recordBtn.textContent = "🎙 Start Recording";
      recordBtn.disabled = false;
    }, 3000);
  });
}
