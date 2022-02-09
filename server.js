let express   
let cors      
let bodyParser
let mongoose  
let port      
let todoRoutes
let app

function myinit(){
    express     = require("express");
    cors        = require("cors");
    bodyParser  = require("body-parser");
    mongoose    = require("mongoose");
    port        = 3000;
    todoRoutes  = require("./routes/Routes");
    app         = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use("/api", todoRoutes);

    app.listen(port, () => {
        console.log(`Listening to http://localhost:${port}`);
    });
}

require("./config/dbConnect")
.then( myinit );

