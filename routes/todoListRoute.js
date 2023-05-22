const express = require("express");

const router = express.Router();
const controller = require("../controllers/todoController");

// router.get("/", controller.getUsers);
// router.post("/", controller.createUser);
router
  .get("/", controller.getTodos)
  .get("/:id", controller.getTodo)
  .post("/", controller.addTodo)
  .put("/:id", controller.updateTodo)
  .delete("/:id", controller.deleteTodo);

module.exports = router;
