const express = require("express")
const app = express()

const morgan = require('morgan')
morgan.token('req-body', (req, res) => {return JSON.stringify(req.body)})

app.use(express.json())
app.use(express.static('dist'))
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :req-body'
  )
)

let phonebook = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

function generateId() {
  let newPhonebook = phonebook.map((contact) => contact.id)
  let maxId = Math.max(...newPhonebook)
  console.log("newPhonebook", newPhonebook)
  
  // Generate random ids for new contacts
  let id = Math.floor(Math.random() * (maxId * 2))
  // Replace an existing id or when id value is 0
  id = newPhonebook.includes(id) || id === 0 ? generateId() : id

  return id
}


app.post("/api/persons", (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      "status": "error",
      "message": "Must pass both name and number"
    })
  }

  let existingUser = phonebook.find((contact) => contact.name === body.name)
  if (existingUser) {
    return response.status(400).json({
      "status": "error",
      "message": "name must be unique"
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }
  phonebook = phonebook.concat(person)

  response.json(person)
})


app.get("/info", (request, response) => {
  response.writeHead(200, {"Content-Type": "text/plain"})
  let date = new Date()
  let text = `\ Phonebook has info for ${phonebook.length} people. \n \n \n ${date}`
  response.end(text)
})


app.get("/api/persons", (request, response) => {
  response.json(phonebook)
})


app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  phonebook = phonebook.filter(contact => contact.id !== id)

  response.status(204).end()
})


app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = phonebook.find((person) => person.id === id)

  if (!person) {
    return response.status(404).json({
      "status": "error",
      "message": "resource not found"
    })
  }

  response.json(person)
})


const PORT = "3001"
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})
