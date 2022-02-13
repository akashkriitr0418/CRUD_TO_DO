const  mongoose  = require("mongoose");

const toDoSchema = new mongoose.Schema({
    "text": String,
    "DueDate": Date,
    "is_completed": Boolean,
    "assigned_to": String,
    "type": String,
    "user_id": String
})
module.exports = new mongoose.model("toDoSchema", toDoSchema);