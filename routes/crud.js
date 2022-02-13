const express = require("express");
const router = express.Router();
const auth =  require("../middleware/auth")

const {
  createTodo,
  getTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
  getTodoByType,
  markCompleteByType,
  deleteTodoBytype,

} = require("../controllers/routeCrudControl");

router.post("/todo/create/",auth.auth, createTodo);
router.put("/todo/update", auth.auth,updateTodo);
router.delete("/todo/delete", auth.auth,deleteTodo);
router.get("/todos/",auth.auth, getAllTodos)
router.get("/todo/", auth.auth, getTodo);

router.delete("/todos/type/delete",auth.auth, deleteTodoBytype);
router.put("/todos/type/mark", auth.auth,markCompleteByType);
router.get("/todos/type/get",auth.auth, getTodoByType);

module.exports = router;
