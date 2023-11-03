const mongoose = require('mongoose')


const url = process.env['DB_URL']

mongoose.set('strictQuery', false)
mongoose.connect(url).then(
    (result) => {
        console.log("connected to  MongoDB")
    }
).catch(
    (error) => {
        console.log('error connecting to MongoDB:', error.messaage)
    }
)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v) {
        // Allow users pass phone numbers with two or three digits 
        // before the hyphen and 7 or more after the hyphen
        return /^\d{2,3}-\d{7,}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number is required.']
  },
})


// modify data from mongodb
// https://mongoosejs.com/docs/api/document.html#Document.prototype.set()
// https://mongoosejs.com/docs/api/document.html#transform
// https://mongoosejs.com/docs/api/document.html#Document.prototype.toJSON()
personSchema.set(
  'toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  }
)
module.exports = mongoose.model('Person', personSchema)
