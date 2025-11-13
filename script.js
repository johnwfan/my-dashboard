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
const apiKey = "YOUR_API_KEY_HERE";
const cityName = "Houston";

async function fetchWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`
    );
    const data = await response.json();

    document.getElementById("city").textContent = data.name;
    document.getElementById("temp").textContent = `${Math.round(
      data.main.temp
    )}°F`;
    document.getElementById("desc").textContent = data.weather[0].description
      .split(" ")
      .map(w => w[0].toUpperCase() + w.slice(1))
      .join(" ");
    document.getElementById(
      "details"
    ).textContent = `Feels like ${Math.round(
      data.main.feels_like
    )}°F | Humidity ${data.main.humidity}%`;
  } catch (error) {
    console.error("Error fetching weather:", error);
    document.getElementById("desc").textContent =
      "Unable to fetch weather data.";
  }
}

// Load weather data immediately
fetchWeather();
