// import express


const express = require('express');

const dataService = require('./dataservice')









const Stock = require('./liveSearch');

//import mongoose

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/stockLiveSearch',{useNewUrlParser: true, useunifiedTopology: true});

const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open',()=>{console.log('Connected to Mongoose')});


// create an server app using express

const app = express();
// to parse json
app.use(express.json())

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/views/index.html');
});

app.post('/getStocks',async(req,res)=>{
    let payload = req.body.payload.trim();
    let search = Stock.find({name:{$regex:new RegExp('^'+payload+'.*','i')}}).exec();
    // limit search results to 10
    search =  search.slice(0,10);
    res.send({payload:search})
});
// login api
app.post('/login',(req,res)=>{
    const result=  dataService.login(req.body.acno,req.body.password,req.body.uname)
    if(result){
        res.send("Login Successful")
    }
    else{
        res.send("Incorrect data")
    }
  
  })

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server has started at 3000');
});
