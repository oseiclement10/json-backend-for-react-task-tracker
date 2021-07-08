const express = require('express');
const app = express();
const port = 5000;

//database connection
const config = require('./config/database');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect(config.database,{useNewUrlParser:true,useUnifiedTopology:true});
const db = mongoose.connection;

//testing db connection
db.once('open',()=>console.log('connected to mongo db successfully'));
db.on('error',error=>console.log('error occured at ' + error));

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//main route

const taskRoute = require('./routes/post');
app.use('/task',taskRoute);

app.get('/',(req,res)=>{
    res.redirect('/task');
})
app.listen(port,()=>console.log('server started on port ' + port));
