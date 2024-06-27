import React, { useState, useEffect } from "react"
import axios from "axios"
import { fetchWeatherApi } from "openmeteo"

const App = () => {
  const [country, setCountry] = useState(null)
  const [info, setInfo] = useState(null)
  const [value, setValue] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    findCountries()
  }, [])

  useEffect(() => {
    if (country) {
      axios
        .get(`https://restcountries.com/v3/name/${country}`)
        .then((response) => {
          setInfo(response.data[0])
        })
        .catch((error) => {
          console.error("Error fetching country info:", error)
        })
    }
  }, [country])

  const findCountries = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data.map((x) => x.name.common))
      })
      .catch((error) => {
        console.error("Error fetching countries:", error)
      })
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div>
      <form>
        Country: <input value={value} onChange={handleChange} />
      </form>
      <pre>
        <ShowCountries
          value={value}
          countries={countries}
          setCountry={setCountry}
        />
        {info && <CountryInfo info={info} />}
      </pre>
    </div>
  )
}

const ShowCountries = ({ value, countries, setCountry }) => {
  const included = countries.filter((name) =>
    name.toLowerCase().includes(value.toLowerCase())
  )

  useEffect(() => {
    if (included.length === 1) {
      setCountry(included[0])
    }
  }, [included, setCountry])

  if (included.length >= 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (included.length > 1) {
    return (
      <div>
        {included.map((country) => (
          <div key={country} onClick={() => setCountry(country)}>
            {country}
            <button onClick={() => setCountry(country)}>Show</button>
          </div>
        ))}
      </div>
    )
  } else if (included.length === 1) {
    return null
  } else {
    return <div>No matches</div>
  }
}
const CountryInfo = ({ info }) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (info && info.capital) {
          const params = {
            latitude: info.latlng[0],
            longitude: info.latlng[1],
            current:
              "temperature_2m,weather_code,wind_speed_10m,wind_direction_10m",
          }

          const url = "https://api.open-meteo.com/v1/forecast"
          const responses = await fetchWeatherApi(url, params)

          // Process responses to get weather data
          const response = responses[0] // Assuming you're processing the first response

          if (response) {
            const utcOffsetSeconds = response.utcOffsetSeconds()
            const timezone = response.timezone()
            const timezoneAbbreviation = response.timezoneAbbreviation()
            const latitude = response.latitude()
            const longitude = response.longitude()
            const current = response.current()

            const weatherData = {
              current: {
                time: new Date(
                  (Number(current.time()) + utcOffsetSeconds) * 1000
                ),
                temperature: current ? current.variables(0).value() : null,
                weatherCode: current ? current.variables(1).value() : null,
                windSpeed: current ? current.variables(2).value() : null,
                windDirection: current ? current.variables(3).value() : null,
              },
            }

            setWeatherData(weatherData)
          }
        }
      } catch (error) {
        console.error("Error fetching weather data:", error)
      }
    }

    fetchWeatherData()
  }, [info])

  if (!info || !weatherData || !weatherData.current) {
    return null // or loading indicator
  }

  return (
    <div>
      <h1>{info.name.common}</h1>
      <p>Capital: {info.capital}</p>
      <p>Population: {info.population}</p>
      <p>Languages: {Object.values(info.languages).join(", ")}</p>
      <img
        src={info.flags[0]}
        alt={`Flag of ${info.name.common}`}
        width="200"
      />

      <div>
        <h2>Weather in {info.capital}</h2>
        <p>
          Temperature: {Math.round(weatherData.current.temperature * 10) / 10}
          °C
        </p>
        <p>
          Wind speed: {Math.round(weatherData.current.windSpeed * 10) / 10} m/s
        </p>
        <p>Date: {weatherData.current.time.toString()}</p>
        {/* Render other weather information */}
      </div>
    </div>
  )
}

export default App
