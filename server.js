const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const app = express();

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")

    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Schema
const studentSchema = new mongoose.Schema({
    name: String,
    email: String,  
    rollNo: Number,
    department: String,
    city: String,
    grade: String
});

const Student = mongoose.model("Student", studentSchema);

// READ
app.get("/", async (req, res) => {
    const students = await Student.find();
    res.render("index", { students });
});

// CREATE
app.post("/add", async (req, res) => {
    await Student.create(req.body);
    res.redirect("/");
});

// EDIT PAGE
app.get("/edit/:id", async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.render("edit", { student });
});

// UPDATE
app.put("/update/:id", async (req, res) => {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
});

// DELETE
app.delete("/delete/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
});
