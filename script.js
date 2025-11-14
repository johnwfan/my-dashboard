// === PAGE NAVIGATION ===
const navLinks = document.querySelectorAll("nav a");
const pages = document.querySelectorAll(".page");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const targetId = link.textContent.trim().toLowerCase();

    // Hide all pages
    pages.forEach(page => page.classList.remove("active"));

    // Show the target page
    const targetPage = document.getElementById(targetId);
    if (targetPage) {
      targetPage.classList.add("active");
    }

    // Update active nav link
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    // Scroll to top for good measure
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// === WEATHER FETCH ===
const apiKey = "bd5e378503939ddaee76f12ad7a97608";
const cityName = "Houston";

async function fetchWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`
    );
    const data = await response.json();

    document.getElementsByClassName("city").textContent = data.name;
    document.getElementsByClassName("temp").textContent = `${Math.round(
      data.main.temp
    )}°F`;
    document.getElementsByClassName("desc").textContent = data.weather[0].description
      .split(" ")
      .map(w => w[0].toUpperCase() + w.slice(1))
      .join(" ");
    document.getElementsByClassName(
      "details"
    ).textContent = `Feels like ${Math.round(
      data.main.feels_like
    )}°F | Humidity ${data.main.humidity}%`;
  } catch (error) {
    console.error("Error fetching weather:", error);
    document.getElementsByClassName("desc").textContent =
      "Unable to fetch weather data.";
  }
}

// Load weather data immediately
fetchWeather();

// === NOTES FEATURE ===

// Load notes on page load
let notes = JSON.parse(localStorage.getItem("notes")) || [];

function displayNotes() {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";

  notes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note-item");

    noteDiv.innerHTML = `
      <p class="note-text">${note}</p>
      <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
    `;

    notesList.appendChild(noteDiv);
  });
}

function addNote() {
  const noteInput = document.getElementById("note-input");
  const text = noteInput.value.trim();

  if (text === "") return;

  notes.push(text);
  localStorage.setItem("notes", JSON.stringify(notes));

  noteInput.value = "";
  displayNotes();
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}

// Add button listener
document.getElementById("add-note-btn").addEventListener("click", addNote);

// Display notes when switching to notes page
displayNotes();
