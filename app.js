const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { exec } = require("child_process");
const detailsModel = require("./Models/models");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/parsing");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, "latest.pdf");
  },
});

const upload = multer({ storage });

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/data", async (req, res) => {
  try {
    const data = await detailsModel.find();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  const uploadedFilePath = req.file.path;

  exec("python app.py", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error}`);
      return;
    }
    console.log(stdout);
  });

  res.send("File uploaded and processed successfully");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
