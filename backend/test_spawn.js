const { spawn } = require('child_process');
const fs = require('fs');

const logStream = fs.createWriteStream('spawn_log.txt', { flags: 'a' });
const log = (msg) => {
    logStream.write(msg + '\n');
    console.log(msg);
};

log("Testing spawn of cc_scraper.py...");

const handle = "shubhamjee";
// Try 'python' first.
const pythonProcess = spawn('python', ['cc_scraper.py', handle]);

let stdoutData = '';
let stderrData = '';

pythonProcess.stdout.on('data', (data) => {
    log(`STDOUT Chunk: ${data}`);
    stdoutData += data.toString();
});

pythonProcess.stderr.on('data', (data) => {
    log(`STDERR Chunk: ${data}`);
    stderrData += data.toString();
});

pythonProcess.on('error', (err) => {
    log(`Failed to start subprocess: ${err}`);
});

pythonProcess.on('close', (code) => {
    log(`Child process exited with code ${code}`);
    log("--- FINAL STDOUT ---");
    log(stdoutData);
    log("--- FINAL STDERR ---");
    log(stderrData);
    logStream.end();
});
