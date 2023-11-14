const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    // TODO: Définir les propriétés du User
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: false,
      required: true,
    },
    ingredients: {
      // type: [IngredientSchemea]
      type: [String],
    },
  },
  { collection: 'users' } // Facultatif
)

const User = mongoose.model('User', userSchema)
module.exports = User
