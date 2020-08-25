const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require("passport");
const path = require('path')

const userRouter = require("./server/routes/user-router");
const shiftRouter = require('./server/routes/shift-router');

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

const db = require('./server/db').dbConnection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./server/config/passport")(passport);



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use("/api/users", userRouter);
app.use('/api', shiftRouter)

// Serve static assets if in production
if(process.env.NODE_ENV == 'production'){
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const apiPort = process.env.PORT || 5000
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))