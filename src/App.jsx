import React from 'react';
import './App.css';
import WheatherCondition from "./Components/WheatherCondition";
import Forecast from "./Components/Forecast";
import Details from "./Components/Details";
import Wheather from './data/Wheather';
import SyncLoader from "react-spinners/SyncLoader";


function App() {
  const { current, loading } = Wheather();

  const timestamp = current.dt

  function verifyIfIsNight(timestamp) {
    const date = new Date(timestamp * 1000)
    const hours = date.getHours();
    if(hours >= 18) {
      return true
    } else if(hours < 18) {
      return false
    }
  }

  function getDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const days = ['Domingo','Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const dayOfWeek = days[date.getDay()];
    const day = date.getDate();
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Setembro', 'Dezembro', 'Novembro', 'Dezembro']
    const month = months[date.getMonth()];
    

    return {
      day,
      dayOfWeek,
      month
    }
  }
  
  function getCurrent() {
    let icon
    let gradient = {}
    let description
    const isNight = verifyIfIsNight(timestamp)

    const currentDescription = current.description

    if(currentDescription === 'céu limpo') {
      if(isNight) {
        icon = './assets/moon.svg'
        gradient = {
          'backgroundColor': 'rgb(139,93,158)',
          'backgroundImage': 'linear-gradient(180deg, rgb(20, 35, 91) 30%, rgb(139,93,158) 100%)'
        }
      } else {
        icon = './assets/sun.svg' 
        gradient =  {
          'backgroundColor': 'rgb(113,185,225)',
          'backgroundImage': 'linear-gradient(225deg, rgb(81,164,219) 30%, rgb(108,182,224) 100%)'
        }
      
      }  

      description = 'Limpo'
    } 
    
    if(currentDescription === 'nublado' || 'algumas nuvens') {
      if(isNight) {
        icon = './assets/cloudy_moon.svg'
        gradient = {
          'backgroundColor': 'rgb(139,93,158)',
          'backgroundImage': 'linear-gradient(180deg, rgb(20, 35, 91) 30%, rgb(139,93,158) 100%)'
        }
      } else {
        icon = './assets/cloud.svg'
        gradient = {
          'backgroundColor': 'rgb(163,187,201)',
          'backgroundImage': 'linear-gradient(180deg, rgb(84,148,178) 30%, rgb(163,187,201) 100%)'
      }
      }
      description = 'Nublado'
    }
    if (currentDescription === 'nuvens dispersas') {
        if(isNight) {
          icon = './assets/cloudy_moon.svg'
          
        } else {
          icon = './assets/cloudy.svg'
        }

        gradient = {
          'backgroundColor': 'rgb(127, 147, 158)',
          'backgroundImage': 'linear-gradient(200deg, #56cbf2b2 0%, rgb(127, 147, 158) 100%)'
        }
        description = 'Parcialmente nublado'
    } 
    if (currentDescription === 'chuva leve') {
      icon = './assets/rain.svg'
      gradient = {
        'backgroundColor': 'rgb(163,187,201)',
        'backgroundImage': 'linear-gradient(180deg, rgb(64,102,164) 20%, rgb(143,130,165) 65%,  rgb(201,168,167)100%)'
      }
      description = 'Chuva'
    }

    return {
      icon, 
      gradient,
      description
    }
  }

  const { icon, gradient, description } = getCurrent();
  const { day, dayOfWeek, month } = getDate(timestamp)
  
  return (
    <div className="App Skeleton" style={gradient}>
      { loading ? 
          <SyncLoader color={'#fff'} loading={loading} size={25} />
        :

        <div className="wheather">
            <div className="header">
                <h1 className="city-name">{current.city}</h1>
                <span>{dayOfWeek}, {day} de {month}</span>
            </div>

            <WheatherCondition 
              temp={Number(current.temp).toFixed(0)}
              max={Number(current.max).toFixed(0)}
              min={Number(current.min).toFixed(0)}
              icon={icon}
              description={description.charAt(0).toUpperCase() + description.slice(1)}
              />

            <Forecast 
              icon={icon} 
              description={description}
              />
            <Details />

           
        </div>
      
      }
    </div>
  );
}

export default App;
