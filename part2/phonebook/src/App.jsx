import { useState, useEffect } from 'react'
import serverServices from './services/apiCalls'
import Form from './components/Form'
import FormInput from './components/FormInput'
import Persons from './components/Persons'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [filtered, setFiltered] = useState([])
  
  useEffect(
    () => {
      serverServices.getAll().then(
        (response) => {
          console.log(response)
          setPersons(response)
        }
      )
    },[]
  )

  const handleOnSubmit = (event) => {
    event.preventDefault()

    // Input validations
    if ((!newName && !phoneNumber) || (!newName || !phoneNumber)) {
      return alert("Must enter contact details!!!")
    }

    let doesExist = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (doesExist) {
      setNewName("")
      setPhoneNumber("")
      return alert(`${newName} already exists in phonebook`)
    }

    const nameObject = {
      name: newName,
      number: phoneNumber,
    }

    serverServices.create(nameObject).then(
      response => {
        setPersons(persons.concat(response))
        setNewName("")
        setPhoneNumber("")
      }
    ).catch(
      err => console.log(err)
    )
  }

  const handleUserName = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value)
  }

  const filterHandler = (event) => {
    const filterParams = event.target.value

    // Filter input against persons array.
    const filteredPersons = persons.filter(
      (person) => person.name.toLowerCase().includes(filterParams ? filterParams:null)
    )

    if (filtered.length > 0) {
      filtered.length = 0
    }
    setFiltered(filtered.concat(filteredPersons))
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      serverServices.deleteUser(id).then(
        setPersons(persons.filter(person => person.id !== id))
      ).catch(
        err => console.log(err)
      )
    }
}

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <FormInput formTitle='Filter shown with' handlerFunc={filterHandler}/>

        <h2>Add new contacts:</h2>
        <Form 
          newName={newName}
          handleOnSubmit={handleOnSubmit} 
          handleUserName={handleUserName}
          persons={persons}
          phoneNumber={phoneNumber}
          handlePhoneNumber={handlePhoneNumber}
        />

        <h2>Numbers</h2>
        <Persons filtered={filtered} persons={persons} handleDelete={handleDelete}/>
      </div>
    </>
  )
}

export default App
