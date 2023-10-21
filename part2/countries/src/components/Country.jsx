import Weather from "./Weather"


const Country = ({country, weather}) => {
    // Handles initial rendering
    if (country === undefined) {
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

            {Object.keys(weather).length >= 1 ? <h2>Weather in {name}</h2> : null}
            {
                Object.keys(weather).length >= 1 ? <Weather weather={weather}/>: null
            }
        </div>
    )
}

export default Country
