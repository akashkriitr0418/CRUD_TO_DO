const Todo = require("../models/crud");

getTodo = (req, res) => {
  const userId = req.user._id;

  Todo.findOne({_id:req.body._id,user_id:userId},(err, todo) => {
    if (err || !todo) {
      return res.status(400).json({
        error: "404 todo not found",
      });
    }
    res.send(todo);
  });
};

getAllTodos = (req, res) => {
  const userId = req.user._id;

  Todo.find({user_id:userId},(err,doc)=>{
     if(err){
     return res.status(400).json({
       error: "404 todo not found",
     });
  }
   res.send(doc);
   })
  };


 createTodo = (req, res) => {
    const todo = new Todo(req.body);
    todo.save((err, task) => {
      if (err || !task) {
        return res.status(400).json({
          error: "something went wrong",
        });
      }
      res.json({ task });
    });
  };


 updateTodo = (req, res) => {
    const userId = req.user._id;
    const todo_id =  req.body["_id"];
    delete req.body["_id"];
    Todo.updateMany({user_id:userId,_id:todo_id},{$set:req.body},(err, t) => {
      if (err || !t){
        return res.status(400).json({
          error: "something went wrong while updating",
        });
      }
      res.json(t);
    });
  };

  
 deleteTodo = (req, res) => {
    const todoId = req.body._id;
    const userId = req.user._id;

    Todo.deleteMany({_id:todoId,user_id:userId},(err, task) => {
      if (err || !task) {
        return res.status(400).json({
          error: "something went wrong while deleting the todo",
        });
      }
      res.json({
        task_deleted: task,
        message: "Todo deleted successfully!",
      });
    });
  };



//ByType
getTodoByType = (req, res) => {
   const type_name =  req.body.type;
   const userId = req.user._id;
    Todo.find({type:type_name,user_id:userId},(err,doc)=>{
      if(err){
      return res.status(400).json({
        error: "404 todo not found",
      });
    }
    res.send(doc);
    })
};

//Mark Done
  markCompleteByType = (req, res) => {
    type_name =  req.body.type;
    const userId = req.user._id;
    Todo.updateMany({type:type_name,user_id:userId},{$set:{is_completed:1}},(err, t) => {
      console.log("doing");
      if (err || !t) {
        return res.status(400).json({
          error: "something went wrong while updating",
        });
      }
      res.json(t);
    });
  };

// delete type

  deleteTodoBytype = (req, res) => {
    type =  req.body.type;
    const userId = req.user._id;
    Todo.deleteMany({type:type,user_id:userId},(err, task) => {
      if (err || !task) {
        return res.status(400).json({
          error: "something went wrong while deleting the todo",
        });
      }
      res.json({
        task_deleted: task,
        message: "Todo deleted successfully!",
      });
    });
  };
  
  module.exports = {  createTodo, getTodo, deleteTodo, getAllTodos, updateTodo,
                      getTodoByType,markCompleteByType,deleteTodoBytype};