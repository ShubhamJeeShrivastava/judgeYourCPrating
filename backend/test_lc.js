const { getLeetCodeStats } = require('./lc_scraper');
const fs = require('fs');

const log = (msg) => {
    fs.appendFileSync('lc_debug.log', msg + '\n');
    console.log(msg);
};

async function test() {
    log("Testing LeetCode Scraper RE-RUN...");
    try {
        const handle = 'Shubham_Jee_Shrivastava';
        log(`Testing handle: ${handle}`);
        const result = await getLeetCodeStats(handle);
        log(`Result for '${handle}': ` + JSON.stringify(result, null, 2));
    } catch (e) {
        log("Test failed: " + e.message);
        log(e.stack);
    }
}

test();
