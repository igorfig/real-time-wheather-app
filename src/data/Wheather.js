import { useState, useEffect } from "react";


const axios = require('axios');

function Wheather(props) {
    const [ current, setCurrent ] = useState({});
    const [ forecast, setForecast ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const key = "5dff8c14d3c0494c0f7f9c9213481d21"

    async function getLat_LonValues(cityName) {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric&lang=pt_br`)
        const data = response.data.coord

        return {
            latitude: data.lat,
            longitude: data.lon,
            city_name: response.data.name
        }
    
    }


    function formatDate(isSunrise,timestamp) {
        const date = new Date(1631955607)
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
        async function getWheather(latitude, longitude, city) {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric&lang=pt_br`)
        const data = response.data

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
    getLat_LonValues("itabira").then(response => getWheather(response.latitude, response.longitude, response.city_name))
}, [])

    return {
        current,
        forecast,
        loading
    }
}

export default Wheather