const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyparser = require("body-parser");
require("dotenv").config();
var cors = require('cors');
var cookieParser = require('cookie-parser');

const errorHandler = require('./middleware/error');


// importar routes 
const authRoutes = require('./routes/authRoute')
const postRoute = require('./routes/postRoute')

//Conexao a db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
})
.then(() => console.log("DB connected"))
.catch((err)=> console.log(err));


//MIDLEWARE
app.use(morgan('dev'));
app.use(bodyparser.json({limit:"5mb"}));
app.use(bodyparser.urlencoded({
    limit:"5mb",
    extended:true
}));
app.use(cookieParser());
app.use(cors());

//routes middleware
app.use('/api',authRoutes);
app.use('/api',postRoute);


//error middleware
app.use(errorHandler);

//port
const port = process.env.PORT || 9000

app.listen(port, ()=> {
    console.log(`servidor ta a dar na porta ${port}`);
})