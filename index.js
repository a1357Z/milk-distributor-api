const express = require('express');
const router = require('./router/index')
require('./database');

//app setup
const app = express();
const port = 8000
app.use(express.json())
app.use(express.urlencoded())

//endpoints
app.use('/',router)
require('./cron')

app.listen(port,(err)=>{
    if(err){
        return console.log(`Error : ${err}`);
    }
    console.log(`server is running on port ${port}`);
})