const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const fs = require('fs');
const { getUserStats } = require('./cf_scraper');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// File Logger Helper
const logFile = fs.createWriteStream('server_debug.log', { flags: 'a' });
const log = (msg) => {
    const timestamp = new Date().toISOString();
    logFile.write(`[${timestamp}] ${msg}\n`);
    console.log(msg);
};

// Helper to run Python script
const runPythonScraper = (handle) => {
    return new Promise((resolve, reject) => {
        log(`Spawning python cc_scraper.py for ${handle}`);
        const pythonProcess = spawn('python', ['cc_scraper.py', handle]);

        let dataString = '';
        let stderrString = '';

        pythonProcess.stdout.on('data', (data) => {
            dataString += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            stderrString += data.toString();
        });

        pythonProcess.on('close', (code) => {
            log(`Python process exited with code ${code}`);
            if (code !== 0) {
                log(`Python Error Output: ${stderrString}`);
                reject(`Python script exited with code ${code}`);
                return;
            }
            try {
                // Log first 100 chars of output to verify
                log(`Python Output Preview: ${dataString.substring(0, 100)}...`);

                if (!dataString.trim()) {
                    log("Error: Python output is empty");
                    reject("Python script returned empty output");
                    return;
                }

                const jsonResult = JSON.parse(dataString);
                log("Successfully parsed JSON");
                resolve(jsonResult);
            } catch (e) {
                log(`JSON Parse Error: ${e.message}`);
                log(`Full Data String: ${dataString}`);
                reject(`Failed to parse Python output: ${e.message}`);
            }
        });
    });
};

app.post('/api/analyze', async (req, res) => {
    const { cfId, lcId, ccId } = req.body;
    log(`Received request: CF=${cfId}, CC=${ccId}, LC=${lcId}`);

    const results = {};

    try {
        if (cfId) {
            log(`Fetching Codeforces data for: ${cfId}`);
            const cfData = await getUserStats(cfId);
            if (cfData.status === 'success') {
                results.cf = cfData;
            } else {
                results.cf = { error: cfData.message };
            }
        }

        if (ccId) {
            log(`Fetching CodeChef data for: ${ccId}`);
            try {
                const ccData = await runPythonScraper(ccId);
                results.cc = ccData;
            } catch (e) {
                log(`CodeChef Scraper Error: ${e}`);
                results.cc = { status: 'error', message: "Failed to fetch CodeChef data. Check server_debug.log." };
            }
        }

        // LeetCode removed per user request
        if (lcId) {
            results.lc = { message: "LeetCode disabled", handle: lcId };
        }

        log("Sending response to frontend");
        res.json(results);
    } catch (error) {
        log(`Server Critical Error: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    log(`Server running on http://localhost:${PORT}`);
    console.log(`Server running on http://localhost:${PORT}`);
});
