const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const path = require("path");

const app = express();

// app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));

const todoModel = require("./models/todomodel");
// const { title } = require("process");

app.get("/", (req, res) => {
  res.render("index");

  // console.log(req.body);

  // res.send({Respnse :req.body})
});

// app.post("/todo/create", async (req, res) => {
//    const todoData =  req.body
//    console.log(todoData,"agyea")
//   let createdtodo = await todoModel.create(
//     {
//       title: todoData.title ,
//       complete: todoData.complete,
//     },
//   );

//   res.send(createdtodo);
// });
// app.get("/todo/get", async (req, res) => {
//     let todos = await todoModel.find();
//     res.send(todos);
// });
app.post("/todo/create", async (req, res) => {
  const todoData = req.body;
  console.log(todoData);
  let createdtodo = await todoModel.create({
    title: todoData.title,
    complete: todoData.complete,
  });
  res.send(createdtodo);
});
app.get("/todo/get", async (req, res) => {
  let todos = await todoModel.find();
  res.send(todos);
});

app.put("/todo/update", async (req, res) => {
  console.log(req.body);
  const id = req.body._id;
  const newTodo = req.body;
  const updatedUser = await todoModel.findByIdAndUpdate(
    id, // The _id string (Mongoose converts it automatically)
    { $set: newTodo }, // The update operation
    // { $set:{complete:true} },   // The update operation
    { returnDocument: "after" }, //  Modern option replacing { new: true }
  );
});

app.delete("/todo/delete", async (req, res) => {
  console.log(req.body);

  const todoId = req.body.todoId;
  let todos = await todoModel.findOneAndDelete({ _id: todoId });

  res.send(todos);
});

// app.get("/todo/get")
const PORT = 5000;

app.listen(PORT, () => {
  console.log("server connected to port " + PORT);
});

mongoose
  .connect("mongodb://localhost:27017/mongopractice")
  .then(() => {
    console.log("DB connected");
  })
  .catch((e) => {
    console.log("mongoDB error", e);
  });
