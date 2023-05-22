const TodoList = require("./models/TodoList");
const express = require("express"),
  { json } = require("express"),
  bodyParser = require("body-parser"),
  todo = require("./routes/todoListRoute");
const { PORT } = process.env;
require("dotenv").config();
const connect = require("./db/database");
connect();

const app = express();
app.set("view engine", "ejs");
app.use("/static", express.static("public"));
app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/todo", todo);

// ROUTES
// GET: To open home and create pages
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/create", (req, res) => {
  res.render("todoList");
});
app.get("/find", (req, res) => {
  TodoList.find({}, (err, tasks) => {
    res.render("findtodoList", { todoTasks: tasks });
  });
});

// POST: To create a task
app.post("/create", async (req, res) => {
  const todoTask = new TodoList({
    title: req.body.title || "Untitled Todo",
    description: req.body.description,
    status: req.body.status,
  });
  try {
    await todoTask.save();
    res.redirect("/find");
  } catch (err) {
    res.redirect("/create");
  }
});

//UPDATE: To edit a task
app
  .route("/edit/:id")
  .get((req, res) => {
    const id = req.params.id;
    TodoList.find({}, (err, tasks) => {
      res.render("todoListEdit.ejs", { todoTasks: tasks, idTask: id });
    });
  })
  .post((req, res) => {
    const id = req.params.id;
    TodoList.findByIdAndUpdate(
      id,
      {
        title: req.body.title || "Untitled Todo",
        description: req.body.description,
        status: req.body.status,
      },
      (err) => {
        if (err) return res.send(500, err);
        res.redirect("/find");
      }
    );
  });

//DELETE: To delete a task
app.route("/remove/:id").get((req, res) => {
  const id = req.params.id;
  TodoList.findByIdAndRemove(id, (err) => {
    if (err) return res.send(500, err);
    res.redirect("/find");
  });
});

// Listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
