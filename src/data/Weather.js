import { useState, useEffect } from "react";
const axios = require('axios');

function Weather() {

    const [ current, setCurrent ] = useState({});
    const [ forecast, setForecast ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const key = "425d5fceb77cdf89fdbd1c3004a85754";

    function formatDate(isSunrise,timestamp) {
        const date = new Date(timestamp)
        const hour = date.getHours();
        const minutes = date.getMinutes();

        if(isSunrise) {
        return `0${hour - 12}:${minutes}`
        } else {
        return `${hour}:${minutes}`
        }
    }

    useEffect(() => {
        setLoading(true);
        async function getWeather(latitude, longitude) {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric&lang=pt_br`)
            const data = response.data

            const getCityName = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`)
            const city = getCityName.data.name

            setCurrent({
                city,
                feels_like: data.current.feels_like,
                humidity: data.current.humidity,
                pressure: data.current.pressure,
                sunrise: formatDate(true, data.current.sunrise),
                sunset: formatDate(false, data.current.sunset),
                temp : data.current.temp,
                uvi: data.current.uvi,
                description: data.current.weather[0].description,
                wind_speed: data.current.wind_speed,
                max: data.daily[0].temp.max,
                min: data.daily[0].temp.min,
                dt: data.current.dt
            },
            )

            setForecast([
                {   dt: data.daily[0].dt,
                    max: data.daily[0].temp.max,
                    min: data.daily[0].temp.min 
                },

                {   dt: data.daily[1].dt,
                    max: data.daily[1].temp.max,
                    min: data.daily[1].temp.min,
                    description: data.daily[0].weather[0].description
                    
                },

                { 
                    dt: data.daily[2].dt,
                    max: data.daily[2].temp.max,
                    min: data.daily[2].temp.min,
                    description: data.daily[1].weather[0].description
                }
            
            ])

            setLoading(false)
            
        }

    

        navigator.geolocation.getCurrentPosition(location => {
            getWeather(location.coords.latitude, location.coords.longitude)
        })
        
        return () => { 
            setCurrent({})
            setForecast([])
        };

}, [key])

    return {
        current,
        forecast,
        loading
    }
}

export default Weather