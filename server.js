require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");


const app = express();
app.use(cors());
app.use(express.json());


app.get("/python", (req, res) => {
  try {
	var spawn = require("child_process").spawn;
	var process = spawn("python3", ["./main.py"]);

	process.stdout.on("data", (data) => {
		const dataStr = data.toString();
		console.log(dataStr);
		res.send(dataStr);
	});
  } catch (ex) {
	console.log(ex);
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running at port ${port}...`);
});
