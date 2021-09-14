import React from "react";
import './Layout/Wheather.css'

function Wheather(props) {
    return (
        // CSS in-line para condicional de clima
        <div className="wheather">
            <div className="header">
                <h1 className="city-name">Itabira, MG</h1>
                <span>Seg, 10:44</span>
            </div>
            <div className="wheather-conditions-container">
               <div className="wheather-condition">
                <img style={{
                        height: '48px',
                        width: '48px'
                    }} src="./assets/main_sun.png" alt="rain icon" className="wheather-condition-icon"/>
                    <span className="wheather-condition-description">Limpo</span>
               </div>

               <div className="wheather-temperature">
                    <span className="temperature">26°</span>      
                    <div className="max-min-temperature">
                        <span className="max">28°C</span>
                        <hr style={{
                            width: '80px',
                            height: '.5px',
                            background: 'white',
                            margin: '10px 0'
                        }}/>
                        <span className="min">20°C</span>
                    </div>        
               </div>
            </div>
           

            <div className="forecast">
                <div className="day0 day">
                    <img src="./assets/moon.svg" alt="sun icon" className="wheather-condition-icon"/>
                    <span class="wheather-condition">Hoje • Limpo</span>
                    <span class="temperature">32° / 15°</span>
                </div>
                <div className="day1 day">
                    <img src="./assets/sun.png" alt="sun icon" className="wheather-condition-icon"/>
                    <span class="wheather-condition">Ter • Limpo</span>
                    <span class="temperature">33° / 16°</span></div>
                <div className="day2 day">
                    <img src="./assets/sun.png" alt="sun icon" className="wheather-condition-icon"/>
                    <span class="wheather-condition">Qua • Chuva</span>
                    <span class="temperature">22° / 15°</span>
                </div> 
            </div>
        </div>
    )
}
export default Wheather