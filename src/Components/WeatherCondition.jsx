import React, { useState, useEffect } from "react";
import './Layout/WeatherCondition.css'

function WeatherCondition(props) {
    const [fade, setFade] = useState(false)

    const controlFade = () => {
        if(window.scrollY < 100) {
            setFade(false)
        } else {
            setFade(true)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', controlFade)

        return () => window.removeEventListener('scroll', controlFade)
    })

    return (
        <div className={`weather-conditions-container ${fade && 'fade-out'}`}>
               <div className="weather-condition">
                <img style={{
                    width: '48px',
                    height: '48px'
                }} src={props.icon} alt="rain icon" className="weather-condition-icon"/>
                    <span className="weather-condition-description">{props.description}</span>
               </div>

               <div className="weather-temperature">
                    <span className="temperature">{props.temp}°</span>      
                    <div className="max-min-temperature">
                        <span className="max">{props.max}°C</span>
                        <hr style={{
                            width: '80px',
                            height: '.5px',
                            background: 'white',
                            margin: '10px 0'
                        }}/>
                        <span className="min">{props.min}°C</span>
                    </div>        
               </div>
            </div>
    )
}

export default WeatherCondition