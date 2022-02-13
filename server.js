
let cors      
let bodyParser
let mongoose  
let port      
let crudRoutes
let userRoutes
let app

    const auth = require("./middleware/auth");
    const   express     = require("express");
    cors        = require("cors");
    bodyParser  = require("body-parser");
    mongoose    = require("mongoose");
    port        = 3001;
    crudRoutes  = require("./routes/crud");
    userRoutes  = require("./routes/user")
    app         = express();
    app.use(cors());
    app.use(bodyParser.json());

    function myinit(){
    app.use("/api", crudRoutes);
    app.use("/api/user", userRoutes);
    app.listen(port, () => {
        console.log(`Listening to http://localhost:${port}`);
    });
}

require("./config/dbConnect")
.then( myinit );

