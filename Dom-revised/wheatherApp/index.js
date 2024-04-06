const btn = document.querySelector("button");
const inpt = document.querySelector(".inpt");
const wheatherinfo = document.querySelector("#weather-info");
// Selecting the button element directly
const fetchData = async (cityName) => {
  const respose = await fetch(
    "Wheather api link"
  );
  const json = await respose.json();
  return json;
};

btn.addEventListener("click", async () => {
    const inptValue = inpt.value;
    const weatherData = await fetchData(inptValue);
    console.log(weatherData);

    // Check if weatherData exists and has data
    if (weatherData && weatherData.location && weatherData.current) {
        const location = weatherData.location;
        const current = weatherData.current;

        // Update DOM elements with weather information
        document.getElementById("location").textContent = `Weather in ${location.name}, ${location.country}`;
        document.getElementById("temperature").textContent = `${current.temp_c}°C`;
        document.getElementById("condition").textContent = current.condition.text;
        document.getElementById("weather-icon").src = "https:" + current.condition.icon;
        document.getElementById("weather-info").style.display = "block"; // Show weather info div
    } else {
        // Hide weather info div if no data available
        document.getElementById("weather-info").style.display = "none";
        const el = document.createElement("h2");
        el.innerText = "Fill the input box";
        document.getElementById("weather-info").appendChild(el);
    }
});
  
