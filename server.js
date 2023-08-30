require('dotenv').config();
const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')



const app = express()
app.use(cors())
app.use(express.json())




app.get('/python', (req,res)=>{
    var spawn = require("child_process").spawn;
      var process = spawn('python3',["./main.py"] );
  


    process.stdout.on('data', function(data) {
        console.log(data.toString());
        res.send(data.toString());
    } )
})







const port = 5000 || process.env.PORT;

app.listen(port,()=>{
    console.log(`server started at ${port}`);
})
