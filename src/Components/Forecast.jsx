import React from "react";
import './Layout/Forecast.css'
import Weather from "../data/Weather";


function Forecast(props) {
    const { forecast } = Weather();

    const forecastDescriptions = forecast.map(data => data.description);

    forecastDescriptions.splice(0, 1);



    const description =  forecastDescriptions.map(description => {
        let descriptionFormated = []
        let icons = []
        
        
        if(description === 'céu limpo') {
            descriptionFormated.push('Limpo')
            icons.push('./assets/sun.svg')
        } 
        if(description === 'nublado') {
           descriptionFormated.push('Nublado')
           icons.push('./assets/cloud.svg')
        } 
        if(description === 'nuvens dispersas') {
            descriptionFormated.push('Parcialmente nublado')
            icons.push('./assets/cloudy.svg')
        } 
        if(description === 'chuva leve') {
            descriptionFormated.push('Chuva')
            icons.push('./assets/rain.svg')
        }
        
        return  { 
            descriptionFormated, 
            icons 
        }
        
    })

    const getDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const day = date.getDay();

        return day
    }

    const timestamp = forecast.map(item => item.dt)
    

    const formatDate = timestamp => {
        const days = ['Dom','Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        const dayFormated = days[getDate(timestamp)]

        return dayFormated
    }


    return (
        <div className="forecast">
           {forecast.map((data, i) => (
                <div className="day" key={i}>
                    <img src={i === 0 ? props.icon : description[i - 1].icons} alt="ícone clima" className="weather-condition-icon"/>
                    <span className="weather-condition">{i >= 1 && i <= 2 ? formatDate(timestamp[i]) : 'Hoje'} • {i === 0 ? props.description : description[i -1].descriptionFormated}</span>
                    <span className="temperature">{data.max.toFixed(0)}° / {data.min.toFixed(0)}°</span>
                </div>
           ))}
        
    </div>
    )
}

export default Forecast