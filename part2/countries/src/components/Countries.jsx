import Country from "./Country"
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'


const Countries = ({filteredCountries, errorMsg}) => {
    const [...countries] = filteredCountries

    const contentStyle = {
        background: '#000',
        position: 'right',
        marginTop: '0',
        marginLeft: '15%',
        width: '100%'
    }

    return (
        <ul>
            {
                countries.map(
                    country => {
                        return (
                            <li key={country.name.common}>
                                <h2 key={country.fifa}>{country.name.common}</h2>
                                <p key={country.capital}>Capital: {country.capital}</p>

                                <Popup 
                                    trigger={
                                        <button>show</button>
                                    }
                                    {...{contentStyle}}
                                >
                                    <Country country={country}/>
                                </Popup>
                            </li>
                        )
                    }
                )
            }
        </ul>
    )
}

export default Countries
