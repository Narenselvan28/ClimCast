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

    const handlecity = (event) => {
        setCity(event.target.value);
    };

    const getweather = () => {
        const Weatherdata = axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=abf73f239c0f3db757c68fe8bfb6fe26&units=metric`);
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
        }).catch((error) => {
            console.error("Error fetching weather data:", error);
        });
    };

    const cfl = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-purple-900 flex items-center justify-center px-4 py-6">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl text-white p-6 sm:p-10 w-full max-w-3xl">
                <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-yellow-400">ClimCast</h1>

                <div className="flex flex-col sm:flex-row mb-8 gap-3">
                    <input
                        type="text"
                        value={city}
                        onChange={handlecity}
                        placeholder="Search a city..."
                        className="flex-1 px-4 py-3 rounded-xl bg-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-xl transition"
                        onClick={getweather}
                    >
                        Search
                    </button>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="text-center space-y-2">
                        <div className="text-6xl sm:text-7xl font-extrabold">{Temperature}°C</div>
                        <div className="text-xl sm:text-2xl font-medium">{cfl(dispc)}</div>
                        <div className="text-white/70 text-base">{cfl(WeatherDescription)}</div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm sm:text-base text-white/90 mt-6 md:mt-0">
                        <div>
                            <p className="font-semibold">Max Temp</p>
                            <p>{parseFloat(MaxTemperature) + 1}°C</p>
                        </div>
                        <div>
                            <p className="font-semibold">Min Temp</p>
                            <p>{parseFloat(MinTemperature) - 1}°C</p>
                        </div>
                        <div>
                            <p className="font-semibold">Humidity</p>
                            <p>{Humidity}%</p>
                        </div>
                        <div>
                            <p className="font-semibold">Wind Speed</p>
                            <p>{WindSpeed} km/h</p>
                        </div>
                        <div>
                            <p className="font-semibold">Cloud Cover</p>
                            <p>{CloudCover}%</p>
                        </div>
                        <div>
                            <p className="font-semibold">Visibility</p>
                            <p>{Visibility / 1000} km</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainComp;
