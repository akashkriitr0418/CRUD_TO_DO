const express = require("express");
const router = express.Router();

const {
  createTodo,
  getTodoById,
  getTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} = require("../controllers/routeControls");

router.param("todoId", getTodoById);

router.post("/todo/create/", createTodo);

router.put("/todo/:todoId/update", updateTodo);

router.delete("/todo/:todoId/delete", deleteTodo);

router.get("/todos/", getAllTodos);

router.get("/todo/:todoId/", getTodo);

module.exports = router;
