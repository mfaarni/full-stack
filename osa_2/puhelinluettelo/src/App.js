import Filter from "./components/filter"
import PersonForm from "./components/personform"
import ShowPersons from "./components/ShowPersons"
import Notification from "./components/Notification"
import personService from "./services/persons"
import { useState, useEffect } from "react"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    console.log("effect")
    personService.getAll().then((response) => {
      console.log("promise fulfilled")
      setPersons(response)
    })
  }, [])
  console.log("render", persons.length, "persons")

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(person.id).then(() => {
        setPersons((deletedPerson) =>
          deletedPerson.filter(({ id }) => id !== person.id)
        )
      })
      setErrorMessage(`${person.name}'s number successfully deleted!`)
      setIsError(false)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map((person) => person.name)
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if (names.includes(newName)) {
      if (
        window.confirm(` ${newName} is already added to phonebook, 
        replace the old number with a new one?`)
      ) {
        const personId = persons[names.indexOf(newName)].id
        personService
          .update(personId, personObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personId ? person : returnedPerson
              )
            )
            setNewName("")
            setNewNumber("")
          })
          .catch((error) => {
            setErrorMessage(
              `'${newName}' was already deleted from server, please update page`
            )
            setIsError(true)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
        setErrorMessage(`${newName}'s number successfully changed!`)
        setIsError(false)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      } else {
        setNewName("")
        setNewNumber("")
      }
    } else {
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
        })
        .catch((error) => {
          console.log("catchattu")
          if (newName.length > 3) {
            setErrorMessage(
              "Number must be at least 8 characters long and formatted correctly!"
            )
            setIsError(true)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          } else {
            console.log("lyhyt nimi")
            setErrorMessage("Name must be at least 3 characters long!")
            setIsError(true)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          }
          console.log(error.response.data)
        })
      setErrorMessage(`${newName} successfully added to phonebook!`)
      setIsError(false)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonelook</h2>
      <Notification message={errorMessage} error={isError} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <ShowPersons
        persons={persons}
        filter={newFilter}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
