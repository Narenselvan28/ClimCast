import React, { useState } from "react";
import axios from "axios";

function MainComp() {
    const [city, setCity] = useState("");
    const [Temperature, setTemperature] = useState("0");
    const [MaxTemperature, setMaxTemperature] = useState("0");
    const [MinTemperature, setMinTemperature] = useState("0");
    const [Humidity, setHumidity] = useState("0");
    const [WindSpeed, setWindSpeed] = useState("0");
    const [CloudCover, setCloudCover] = useState("0");
    const [Visibility, setVisibility] = useState("0");
    const [WeatherDescription, setWeatherDescription] = useState("None");
    const [dispc, setdispc] = useState("Enter City Name");

    function handlecity(event) {
        setCity(event.target.value);
    }
    
    function getweather() {
        var Weatherdata = axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=abf73f239c0f3db757c68fe8bfb6fe26&units=metric`);
        setdispc(city);

        Weatherdata.then((response) => {
            setTemperature(response.data.main.temp);
            setMaxTemperature(response.data.main.temp_max);
            setMinTemperature(response.data.main.temp_min);
            setHumidity(response.data.main.humidity);
            setWindSpeed(response.data.wind.speed);
            setCloudCover(response.data.clouds.all);
            setVisibility(response.data.visibility);
            setWeatherDescription(response.data.weather[0].description);
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
    }

    function cfl(string) {
        return string.toUpperCase();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-purple-900 flex items-center justify-center px-4">
            <div className="backdrop-blur-md bg-white/20 border border-white/20 rounded-3xl shadow-2xl text-white p-12 w-full max-w-4xl">
                <h1 className="text-4xl font-bold mb-10 text-center tracking-wide text-yellow-400">ClimCast</h1>

                <div className="flex mb-12">
                    <input
                        type="text"
                        value={city}
                        onChange={handlecity}
                        placeholder="Search a luxurious city..."
                        className="flex-1 px-5 py-3 rounded-l-xl bg-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <button className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-r-xl font-medium transition duration-300" onClick={getweather}>
                        Search
                    </button>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="text-center space-y-3">
                        <div className="text-7xl font-extrabold">{Temperature}°C</div>
                        <div className="text-2xl font-medium">{cfl(dispc)}</div>
                        <div className="text-white/70 text-lg">{cfl(WeatherDescription)}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-16 gap-y-6 text-sm text-white/90">
                        <div>
                            <p className="text-white font-semibold">Max Temperature</p>
                            <p>{MaxTemperature + 1}°C</p>
                        </div>
                        <div>
                            <p className="text-white font-semibold">Min Temperature</p>
                            <p>{MinTemperature - 1}°C</p>
                        </div>
                        <div>
                            <p className="text-white font-semibold">Humidity</p>
                            <p>{Humidity}%</p>
                        </div>
                        <div>
                            <p className="text-white font-semibold">Wind Speed</p>
                            <p>{WindSpeed} km/h</p>
                        </div>
                        <div>
                            <p className="text-white font-semibold">Cloud Cover</p>
                            <p>{CloudCover}%</p>
                        </div>
                        <div>
                            <p className="text-white font-semibold">Visibility</p>
                            <p>{Visibility / 1000} km</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainComp;
