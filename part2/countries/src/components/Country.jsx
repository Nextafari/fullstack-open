const Country = ({country, weather}) => {
    // Handles initial rendering
    if (country === undefined || Object.keys(weather).length < 1) {
        return null
    }

    const name = country.name.common
    const capital = country.capital
    const area = country.area
    const [...languages] = Object.values(country.languages)
    const flag = country.flags.png

    return (
        <div>
            <h2>{name}</h2>
            <p>Capital: {capital}</p>
            <p>Area: {area}</p>

            <div>
                <h2>Languages</h2>

                <ul>
                    {
                        languages.map(
                            (language) => <li key={language}>{language}</li>
                        )
                    }
                </ul>
            </div>

            <img src={flag} alt="country flag"></img>

            <div>
                <h2>Weather in {name}</h2>

                <p>Temperature: {weather.main.temp} °F</p>

                {weather.weather.map(
                    (data) => {
                        return (
                            <>
                                <p key={data.main}>Weather: {data.main} </p>
                                <p key={data.description}>Weather Description: {data.description} </p>
                            </>
                        )
                    }
                )}

                <img src={weather.icon_url} alt="weather icon" />

                <p>Wind: {weather.wind.speed} m/s</p>
            </div>
        </div>
    )
}

export default Country
