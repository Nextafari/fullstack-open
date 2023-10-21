import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import Country from './components/Country'
import FormInput from './components/FormInput'
import Notification from './components/Notification'
import serverCalls from './services/apiCalls'

function App() {
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)
  const [weather, setWeather] = useState({})


  useEffect(
    () => {
      if (countries.length === 0) {
        serverCalls.getAll().then(
          response => {
            setCountries(countries.concat(response))
          }
        ).catch(
          error => {
            console.log(error)
            console.error(error)
          }
        )
      }
    },
    []
  )

  useEffect(
    () => {
      if (filtered.length === 1) {
        serverCalls.getWeatherReport(filtered[0].capital).then(
          response => {
            const icon = response.weather[0].icon
            response['icon_url'] = `https://openweathermap.org/img/wn/${icon}@2x.png`
            
            setWeather(response)
          }
        ).catch(
          error => {
            console.log(error)
          }
        )

      }
    },
    [filtered]
  )

  const filterHandler = (event) => {
    const filterParams = event.target.value

    // Clear filtered countries from last render on user input.
    setFiltered([])

    // Filter countries based on user input
    const filteredCountries = countries.filter(
      (country) => 
      country.name.common.toLowerCase().includes(
        filterParams ? filterParams:null
      )
    )

    if (filteredCountries.length <= 10) {
      setFiltered(filteredCountries)
    } else {
      setErrorMsg('Too many matches, specify another filter')

      setTimeout(
        () => {
          setErrorMsg(null)
        },
        2000
      )
    }

  }

  return (
    <>
      <FormInput formTitle='Find countries' handlerFunc={filterHandler}/>

      <Notification errorMsg={errorMsg} />

      {
        filtered.length > 1 
        ? 
        <Countries filteredCountries={filtered} errorMsg={errorMsg} weather={weather}/> 
        :
        <Country country={filtered[0]} weather={weather}/>
      }
    </>
  )
}

export default App
