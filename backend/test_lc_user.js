const { getLeetCodeStats } = require('./lc_scraper');
const fs = require('fs');

const log = (msg) => {
    fs.appendFileSync('lc_debug_user.log', msg + '\n');
    console.log(msg);
};

async function test() {
    log("Testing LeetCode Scraper for User...");
    try {
        const handle = 'Shubham_Jee_Shrivastava';
        const result = await getLeetCodeStats(handle);
        log(`Result for '${handle}': ` + JSON.stringify(result, null, 2));
    } catch (e) {
        log("Test failed: " + e.message);
        log(e.stack);
    }
}

test();
