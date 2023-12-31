import { useState, useEffect } from 'react'
import serverServices from './services/apiCalls'
import Form from './components/Form'
import FormInput from './components/FormInput'
import Persons from './components/Persons'
import Notification from './components/Notification'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [filtered, setFiltered] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)
  const [successMsg, setSuccessMsg] = useState("")
  
  useEffect(
    () => {
      serverServices.getAll().then(
        (response) => {
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
    
    const nameObject = {
      name: newName,
      number: phoneNumber,
    }

    const doesExist = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (doesExist) {
      let msg = `${doesExist.name} is already added to phonebook, replace the old number with a new one?`
      
      if (window.confirm(msg)) {
        serverServices.update(doesExist.id, nameObject).then(
          // replace modified person object in state with response.data(modified data)
          response => setPersons(persons.map(person => person.id === response.id ? response : person))
        ).catch(
          err => {
            setErrorMsg(`Information about ${doesExist.name} has already been removed from the server.`)
            setTimeout(() => setErrorMsg(null), 5000)
          }
        )
      }
      setNewName("")
      setPhoneNumber("")
      return
    }

    serverServices.create(nameObject).then(
      response => {
        setPersons(persons.concat(response))
        setSuccessMsg(`Added ${response.name}`)
        setNewName("")
        setPhoneNumber("")
        setTimeout(() => setSuccessMsg(null), 5000)
      }
    ).catch(
      err => {
        setErrorMsg(err.response.data.error)
        setTimeout(() => setErrorMsg(null), 5000)
      }
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
        err => {
          console.log("catch", err);
        }
      )
    }
  }

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <FormInput formTitle='Filter shown with' handlerFunc={filterHandler}/>

        {errorMsg === null ? null: <Notification errorMsg={errorMsg} successMsg={successMsg}/>}

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
