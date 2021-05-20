// app.js
import express from "express";
const port = 3000;

const app = express();
app.use(express.static("demo"));
app.listen(port, () => {
    console.log(`Running at ${port}`)
});