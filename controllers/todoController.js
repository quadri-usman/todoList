const Todo = require("../models/TodoList");
const { v4: uuid } = require("uuid");

// create new user
exports.addTodo = async (req, res) => {
  try {
    const todo = new Todo({
      id: uuid(),
      title: req.body.title || "Untitled Todo",
      description: req.body.description,
      status: req.body.status,
    });

    // Save Todo in the database
    todo.save().then((newTodo) => {
      res.send(newTodo);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get all users
exports.getTodos = async (req, res) => {
  try {
    Todo.find().then((todos) => {
      res.send(todos);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// get single user
exports.getTodo = async (req, res) => {
  try {
    Todo.findById(req.params.id).then((todo) => {
      if (!todo) {
        return res.status(404).send({
          message: "Todo not found with id " + req.params.id,
        });
      }
      res.send(todo);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update / edit user
exports.updateTodo = async (req, res) => {
  try {
    Todo.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title || "Untitled Todo",
        description: req.body.description,
        status: req.body.status,
      },
      { new: true }
    ).then((todo) => {
      if (!todo) {
        return res.status(404).send({
          message: "Todo not found with id " + req.params.id,
        });
      }
      res.send(todo);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// delete user
exports.deleteTodo = async (req, res) => {
  try {
    Todo.findByIdAndRemove(req.params.id).then((todo) => {
      if (!todo) {
        return res.status(404).send({
          message: "Todo not found with id " + req.params.id,
        });
      }
      res.send({ message: "Todo deleted successfully!" });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
