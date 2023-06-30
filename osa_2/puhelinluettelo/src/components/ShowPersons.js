const Person = ({person, deletePerson}) => {
    return (
      <div>
        {person.name + ' ' + person.number}
        <button onClick={() => deletePerson(person)}>Poista</button>
      </div>
    )
  }
  const ShowPersons = ({persons, filter, deletePerson}) => {


    if (filter) {
      const filteredPersons = persons.filter(person =>
         person.name.toLowerCase().indexOf(filter.toLowerCase()) != -1)
      return (
        <div>
          {filteredPersons.map(person =>
            <Person 
            key = {person.id} 
            person={person} 
            deletePerson={deletePerson}/>
            )}
        </div>
    ) 
    } else {
      return(
        <div>
          {persons.map(person =>
            <Person 
            key = {person.id} 
            person={person} 
            deletePerson={deletePerson}/>
            )}
        </div>
      )
    }
  }
  

export default ShowPersons

