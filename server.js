require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");


const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
	const msg = `HeLLo from Server side 👋...!!!`;
	res.send(msg);
})

app.get("/python-print", (req, res) => {
  try {
	var spawn = require("child_process").spawn;
	var pyProcess = spawn("python3", ["./printMessage.py"]);

	pyProcess.stdout.on("data", (data) => {
		const dataStr = data.toString();
		console.log(dataStr);
		res.send(dataStr);
	});

	pyProcess.stderr.on("data", (err) => {
		const e = err.toString();
		console.error('Error:', e);
	});
  } catch (err) {
	console.log(err);
	res.send(err);
  }
});

app.get("/python", (req, res) => {
  try {
	var spawn = require("child_process").spawn;
	var pyProcess = spawn("python", ["./main.py"]);

	pyProcess.stdout.on("data", (data) => {
		const dataStr = data.toString();
		console.log(dataStr);
		res.send(dataStr);
	});

	pyProcess.stderr.on("data", (err) => {
		const e = err.toString();
		console.error('Error:', e);
	});
  } catch (err) {
	console.log(err);
	res.send(err);
  }
});

app.get("/python-numpy", (req, res) => {
  try {
	var spawn = require("child_process").spawn;
	var pyProcess = spawn("python3", ["./printNumpy.py"]);

	pyProcess.stdout.on("data", (data) => {
		const dataStr = data.toString();
		console.log(dataStr);
		res.send(dataStr);
	});

	pyProcess.stderr.on("data", (err) => {
		const e = err.toString();
		console.error('Error:', e);
	});
  } catch (err) {
	console.log(err);
	res.send(err);
  }
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running at port '${port}'...`);
});
