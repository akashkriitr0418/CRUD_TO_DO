const Todo = require("../schema/dbSchema");

getTodoById = (req, res, next, todoId) => {
  Todo.findById(todoId).exec((err, todo) => {
    if (err || !todo) {
      return res.status(400).json({
        error: "404 todo not found",
      });
    }
    req.todo = todo;
    next();
  });
};

getAllTodos = (req, res) => {
    Todo.find()
      .sort("-createdAt")
      .exec((err, todos) => {
        if (err || !todos) {
          return res.status(400).json({
            error: "Something went wrong in finding all todos",
          });
        }
        res.json(todos);
      });
  };

 getTodo = (req, res) => {
    return res.json(req.todo);
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
    const todo = req.todo;
    todo.task = req.body.task;
    todo.save((err, t) => {
      if (err || !t) {
        return res.status(400).json({
          error: "something went wrong while updating",
        });
      }
      res.json(t);
    });
  };

  
 deleteTodo = (req, res) => {
    const todo = req.todo;
    todo.remove((err, task) => {
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
  
  module.exports = {  createTodo, getTodoById, getTodo, deleteTodo, getAllTodos, updateTodo}