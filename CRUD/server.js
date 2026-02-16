const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();

mongoose.connect("mongodb://localhost:27017/studentDB")

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const studentSchema = new mongoose.Schema({
    name: String,
    email: String
});

const Student = mongoose.model("Student", studentSchema);

app.get("/", async (req, res) => {
    const students = await Student.find();
    res.render("index", { students });
});

app.post("/add", async (req, res) => {
    await Student.create(req.body);
    res.redirect("/");
});

app.get("/edit/:id", async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.render("edit", { student });
});

app.put("/update/:id", async (req, res) => {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
});

app.delete("/delete/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
