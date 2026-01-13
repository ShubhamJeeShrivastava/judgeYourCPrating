const axios = require('axios');
const fs = require('fs');

const log = (msg) => {
    fs.appendFileSync('server_test_debug.log', msg + '\n');
    console.log(msg);
};

async function testServer() {
    log("Testing Server LeetCode Endpoint...");
    try {
        const response = await axios.post('http://127.0.0.1:5001/api/analyze', {
            lcId: 'Shubham_Jee_Shrivastava'
        });
        log("Response Status: " + response.status);
        log("Response Data: " + JSON.stringify(response.data, null, 2));
    } catch (e) {
        log("Server Test Failed: " + e.message);
        if (e.response) {
            log("Error Response: " + JSON.stringify(e.response.data));
        }
    }
}

testServer();
