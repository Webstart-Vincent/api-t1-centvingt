const User = require('../model/user')

const mailPattern =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

module.exports = {
  checkAuthPayload: (req, res, next) => {
    // Récupérer l’email et le password dans le body de la requête
    const { email, password } = req.body

    // S’il manque une de ces données, retourner une erreur au client
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' })
    }

    req.email = email
    req.password = password

    // Sinon, passer au middleware suivant
    next()
  },

  checkEmailPayload: (req, res, next) => {
    const { email } = req

    if (!mailPattern.test(email))
      return res.status(400).json({ message: "Invalid email's format" })

    next()
  },

  checkPasswordPayload: (req, res, next) => {
    // TODO: Check password pattern
    next()
  },

  signupResponse: async (req, res) => {
    try {
      // Enregistrer le nouvel utilisateur
      const { email, password } = req

      const existingUser = await User.findOne({ email })
      if (existingUser) throw new Error('Existing user')

      const newUser = new User({
        email,
        password,
        ingredients: [],
      })

      const savedUser = await newUser.save()
      if (!savedUser) throw new Error('Saving user error')

      // Envoyer la réponse
      return res.status(201).json({ message: 'OK', userId: savedUser._id })
    } catch (error) {
      let status = 500
      let message = 'Unexpected error'

      if (error.message === 'Existing user') {
        status = 400
        message = error.message
      }

      console.error('---')
      console.error(
        new Date().toISOString(),
        'controllers/admin-controllers.js > signupResponse > error >',
        error
      )

      return res.status(status).json({ message })
    }
  },
}
