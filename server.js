const express = require("express");
const { spawn } = require("child_process");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

function runPythonScript(scriptPath, callback) {
    const virtualEnvPath = 'TEST_ENV';

    // const activationScript = process.platform === 'win32' ? `${virtualEnvPath}\\Scripts\\activate` : `source ${virtualEnvPath}/bin/activate`;
    let activationScript = "";
    try {
        console.log('Platform:', process.platform);
        activationScript = process.platform === 'win32' ? `.\\${virtualEnvPath}\\Scripts\\activate &&` : `source ./${virtualEnvPath}/bin/activate &&`;
    } catch (e) {
        console.log(e);
        activationScript = `source ./${virtualEnvPath}/bin/activate &&`;
    }

    const pythonScriptCommand = `python ${scriptPath}`;
    const fullCommand = `${activationScript} && ${pythonScriptCommand}`;

    const pyProcess = spawn('bash', ['-c', fullCommand]);

    let output = '';
    let error = '';

    pyProcess.stdout.on("data", (data) => {
        output += data.toString();
    });

    pyProcess.stderr.on("data", (data) => {
        error += data.toString();
    });

    pyProcess.on("close", (code) => {
        if (code === 0) {
            callback(null, output);
        } else {
            callback(error, null);
        }
    });
}

app.get("/", (req, res) => {
    const msg = `Hello from the server side!`;
    res.send(msg);
});

app.get("/python-print", (req, res) => {
    runPythonScript("./python-scripts/printMessage.py", (error, output) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).send(error);
        } else {
            console.log(output);
            res.send(output);
        }
    });
});

app.get("/python", (req, res) => {
    runPythonScript("./python-scripts/main.py", (error, output) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).send(error);
        } else {
            console.log(output);
            res.send(output);
        }
    });
});

app.get("/python-numpy", (req, res) => {
    runPythonScript("./python-scripts/printNumpy.py", (error, output) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).send(error);
        } else {
            console.log(output);
            res.send(output);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at port ${port}...`);
});
