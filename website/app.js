/* Start Of Global Variables */
// API key
const apiKey = "9dd2df840170d436750802f449c58991&units=imperial";
//base URL for Open Weather API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const generateButton = document.getElementById("generate");
/* End Of Global Variables */
// Input Elements

generateButton.addEventListener("click", generateWeatherData);

async function generateWeatherData() {
  try {
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    const weatherData = await getWeatherData(zipCode);
    await postData("/api/data", {
      name: weatherData.name,
      temperature: weatherData.main.temp,
      date: getCurrentDate(),
      userResponse: feelings,
    });

    await updateUI();
  } catch (error) {
    console.log(error);
  }
}

async function getWeatherData(zipCode) {
  const url = `${baseURL}${zipCode}&appid=${apiKey}`;

  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorMessage = await response.json();
    console.log("Error:", errorMessage);
    document.getElementById(
      "error"
    ).textContent = `${errorMessage?.message}. Please enter a valid zip code.`;
    throw new Error(errorMessage);
  }
}

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  return responseData;
}

async function updateUI() {
  const response = await fetch("/api/data");
  const data = await response.json();
  document.getElementById("error").textContent = "";
  document.getElementById("name").innerHTML = `City name: ${data.name}`;
  document.getElementById(
    "temp"
  ).innerHTML = `Temperature: ${data.temperature}°C`;
  document.getElementById("date").innerHTML = `Date: ${data.date}`;
  document.getElementById(
    "content"
  ).innerHTML = `User Response: ${data.userResponse}`;
}

// Create a new date instance dynamically with JS
function getCurrentDate() {
  const d = new Date();
  const newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;
  return newDate;
}
