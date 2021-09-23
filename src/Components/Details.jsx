import React from "react";
import './Layout/Details.css'
import Weather from "../data/Weather";

function Details(props) {
    const { current } = Weather();

   return (
        <div className="details">
            <div className="sun-details">
                <div className="sunrise">
                    <span>Nascer do Sol {current.sunrise}</span>
                </div>

                <hr style={{
                    width: '100px',
                    height: '1px',
                    marginLeft: '10px',
                    background: 'white',
                    opacity: '.6'
                }}/>

                <div className="sun"></div>

                <div className="sunset">
                    <span>Pôr do sol {current.sunset}</span>
                </div>
            </div>

            <div className="weather-details">
                <div className="feels-like">
                    <span className="title">Sensação</span>
                    <span className="content">{Number(current.feels_like).toFixed(1)}°C</span>
                </div>

                <div className="humidity">
                    <span className="title">Umidade</span>
                    <span className="content">{current.humidity}%</span>
                </div>

                <div className="pressure">
                    <span className="title">Pressão</span>
                    <span className="content">{current.pressure}mbar</span>
                </div>

                <div className="wind-speed">
                    <span className="title">Vel. do vento</span>
                    <span className="content">{current.wind_speed}</span>
                </div>

                <div className="uvi">
                    <span className="title">Índice UV</span>
                    <span className="content">{current.uvi}</span>
                </div>
            </div>
        </div>
   )
}

export default Details