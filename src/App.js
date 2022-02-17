import axios from 'axios'
import { useState, useEffect } from 'react'
import "./app.css"

const api = {
  key: "b94e53a435a10994c9f671ff48ecbc39",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const iller = ["Select a City", "Adana", "Adıyaman", "Afyon", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin",
    "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale",
    "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum ", "Eskişehir",
    "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir",
    "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya ", "Malatya",
    "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya",
    "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon  ", "Tunceli", "Şanlıurfa", "Uşak",
    "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt ", "Karaman", "Kırıkkale", "Batman", "Şırnak",
    "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük ", "Kilis", "Osmaniye ", "Düzce"]

  const [selectedCity, setSelectedCity] = useState("")
  const [weather, setWeather] = useState("")



  const onClickHandler = () => {
    if (selectedCity !== "")
      fetch(`${api.base}weather?q=${selectedCity}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setSelectedCity('');
          console.log(result);
        });
  }

  const tempCheck = () => {
    if (weather !== "") {
      let temp = Math.round(weather.main.temp)
      let finalText = temp + "°"
      return (
        finalText
      )
    }
  }

  const situationCheck = () => {
    if (weather !== "") {
      let situation = weather.weather[0].main
      return (
        <div className='situation'>
          <h3>{situation}</h3>
        </div>
      )
    }
  }
  const locationCheck = () => {
    if (weather !== "") {
      let location = weather.name.split(" ").slice(0, 1)
      return (
        location
      )
    }
  }


  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 12) ? 'container warm' : 'container') : 'container'}>
      <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 12) ? 'app warm' : 'app') : 'app'}>
        <main>
          <div className='top'>
            <div className='location'>
              {locationCheck()}
            </div>
            <div>
              <div className='temp'>
                <h2>{tempCheck()}</h2>
              </div>
              {situationCheck()}
            </div>
          </div>
          <div className='select-area'>
            <select className='custom-select' value={selectedCity} onChange={(e) => { setSelectedCity(e.target.value) }}>
              {
                iller.map((el, i) => {
                  return (
                    <option key={i} value={iller[i]}>{iller[i]}</option>
                  )
                })
              }
            </select>
            <br />
            <button className='btn' onClick={onClickHandler}>Submit</button>
          </div>

        </main>

      </div>
    </div>
  )
}

export default App