import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [country, setCountry] = useState(null)
  const [info, setInfo] = useState()
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    FindCountries()
    console.log('effect run, country is now', country)
    console.log('country: ', country)

    if (country) {
      console.log('fetching country info...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then(response => {
          setInfo(response.data)
        console.log('data: ', response.data)
        })
    }
  }, [country])


  const FindCountries = () => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data.map(x => x.name.common))
      })
  }


  const handleChange = (event) => {
    console.log('es: ', event.target.value)
    setValue(event.target.value)
  }

  const ShowCountries = ({value}) => {
    const included = countries.filter(
      name => name.toLowerCase().includes(value))
    
    if (included.length>=10){
      return ( <div>Liian monta maata</div>)
    }else if (included.length>1){
    return (
    <div>
        {included.map(country => 
        <Country key = {country} country = {country} only ={false}/>)}

    </div>
  )}else{
    setCountry(included[0])
    return (
      <div>
      {included.map(country => 
        <Country key = {country} country = {country} only ={true}/>)}
        {info.capital}
    </div>
    )
  }

}

  const Country = ({country, only}) => {
    if (only) {
      console.log("maa: "+ info)
      return(
        <div>
          <h1>{country}</h1>
        </div>
      )
    } else {
    return(
      <div>
        {country}
      </div>
    )
  }}

  return (
    <div>
      <form>
        country: <input country={country} onChange={handleChange} />
      </form>
      <pre>
        <ShowCountries value={value} />
      </pre>
    </div>
  )
}

export default App;
