const uri = "mongodb+srv://netanel:davidov@cluster0.phdqs.mongodb.net/test?retryWrites=true&w=majority";
const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://netanel:davidov@cluster0.c0grm.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {console.log('Connection to mongodb succeeded!')})
	.catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = {
	dbConnection: db,
	secretOrKey: "secret"
}