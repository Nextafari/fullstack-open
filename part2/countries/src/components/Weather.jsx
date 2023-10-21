const Weather = ({weather}) => {

    return (
        <div>

            <p>Temperature: {weather.main.temp} °F</p>

            {weather.weather.map(
                (data) => <p key={data.main}>Weather: {data.main} ({data.description})</p>
            )}

            <img src={weather.icon_url} alt="weather icon" />

            <p>Wind: {weather.wind.speed} m/s</p>
        </div>
    )
}


export default Weather
