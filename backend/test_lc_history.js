const axios = require('axios');
const fs = require('fs');

const log = (msg) => {
    fs.appendFileSync('history_debug.log', msg + '\n');
    console.log(msg);
};

async function testHistory() {
    log("Testing LeetCode History Query RE-RUN...");
    const username = 'neal_wu';

    const query = `
        query getContestHistory($username: String!) {
            userContestRankingHistory(username: $username) {
                attended
                rating
                ranking
                contest {
                    title
                    startTime
                }
            }
        }
    `;

    try {
        const response = await axios.post('https://leetcode.com/graphql', {
            query,
            variables: { username }
        });

        const history = response.data.data.userContestRankingHistory;
        log(`Retrieved ${history ? history.length : 0} contests.`);

        if (history && history.length > 0) {
            const attended = history.filter(h => h.attended);
            log(`Attended ${attended.length} contests.`);
            if (attended.length > 0) {
                log("Sample Contest: " + JSON.stringify(attended[attended.length - 1], null, 2));
            }
        }

    } catch (e) {
        log("Error: " + e.message);
        if (e.response) log("Response: " + JSON.stringify(e.response.data));
    }
}

testHistory();
