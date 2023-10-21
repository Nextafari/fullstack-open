import axios from 'axios'


const baseUrl = "https://studies.cs.helsinki.fi/restcountries/"
const openWeatherApiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY

// Fetch all countries
function getAll() {
    const request = axios.get(`${baseUrl}api/all`)

    return request.then(
        response => response.data
    )
}


function getWeatherReport(cityName) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${openWeatherApiKey}`
    const request = axios.get(url)

    return request.then(
        (response) => response.data
    )
}


export default {getAll, getWeatherReport}
