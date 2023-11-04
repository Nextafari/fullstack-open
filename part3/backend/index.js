// Allows usage of process.env
require('dotenv').config()

// const Person = mongoose.model('Person', personSchema)
const Person = require('./models/person')


const express = require('express')
const app = express()

const morgan = require('morgan')
morgan.token('req-body', (req) => {return JSON.stringify(req.body)})
const middleware = require('./middleware')

app.use(express.static('dist'))
app.use(express.json())
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :req-body'
  )
)



// function generateId() {
//   let newPhonebook = phonebook.map((contact) => contact.id)
//   let maxId = Math.max(...newPhonebook)
//   console.log("newPhonebook", newPhonebook)
  
//   // Generate random ids for new contacts
//   let id = Math.floor(Math.random() * (maxId * 2))
//   // Replace an existing id or when id value is 0
//   id = newPhonebook.includes(id) || id === 0 ? generateId() : id

//   return id
// }


app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const name = body.name
  const number = body.number

  if (!name || !number) {
    return response.status(400).json({
      "status": "error",
      "message": "Must pass both name and number"
    })
  }

  Person.find({name: name}).then(
    people => {
      let existingUser = people.find(person => person.name === name)

      if (existingUser) {
        return response.status(400).json({
          "status": "error",
          "message": "name must be unique"
        })
      }
    }
  ).catch(
    error => next(error)
  )

  const person = new Person({
    name: name,
    number: number
  })
  
  person.save().then((personData) => {
    response.json(personData)
  }).catch((error) => {
    next(error)
  })

})


app.get("/info", (request, response, next) => {
  response.writeHead(200, {"Content-Type": "text/plain"})
  let date = new Date()
  Person.countDocuments({}).then((count) => {
    let text = `\ Phonebook has info for ${count} people. \n \n \n ${date}`
    response.end(text)
  }).catch(error => next(error))
})


app.get("/api/persons", (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})


app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id
  // phonebook = phonebook.filter(contact => contact.id !== id)
  Person.findByIdAndRemove(id).then(
    response.status(204).end()
  ).catch(error => next(error))

})


app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: 'query'
  }).then(
    updatedPerson => {response.json(updatedPerson)}
  ).catch(error => next(error))

})


app.get("/api/persons/:id", (request, response, next) => {
  // const id = Number(request.params.id)
  // const person = phonebook.find((person) => person.id === id)
  Person.findById(request.params.id).then(
    person => {
      if (person) {
        response.json(person)
      }else {
        response.status(404).json({
          "status": "error",
          "message": "resource not found"
        })
      }
    }
  ).catch(
    (error) => next(error)
  )
})


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const PORT = process.env['PORT']
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})
