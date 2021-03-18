const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const header_middleware = require('./middlewares/header');

const app = express();

app.use(cors());
app.use(express.json());
app.use(header_middleware);

//connect to mongoose
require('dotenv').config();
mongoose.connect(process.env.DB_URI,
    {
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,

        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
)
.then(res => {
    console.log('db connected!');
})
.catch(err => {
    console.log('Error:', err);
});

//routes
app.use('/api/users/', require('./routes/usersRoute'));   // register, login, logout
app.use('/api/designs/', require('./routes/designsRoute')); // details/:id, browse (all), create


app.listen(3037, function() {
    console.log('express running on 3037');
});