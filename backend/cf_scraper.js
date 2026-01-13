const axios = require('axios');

async function getUserStats(handle) {
    try {
        // Fetch User Info
        const userInfoResponse = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
        if (userInfoResponse.data.status !== 'OK') {
            throw new Error(`Failed to fetch user info: ${userInfoResponse.data.comment}`);
        }
        const user = userInfoResponse.data.result[0];

        // Fetch Rating History
        const ratingResponse = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`);
        if (ratingResponse.data.status !== 'OK') {
            throw new Error(`Failed to fetch rating history: ${ratingResponse.data.comment}`);
        }
        const ratingHistory = ratingResponse.data.result;

        return {
            status: 'success',
            handle: user.handle,
            rating: user.rating,
            maxRating: user.maxRating,
            rank: user.rank,
            maxRank: user.maxRank,
            avatar: user.titlePhoto,
            history: ratingHistory.map(r => ({
                contestName: r.contestName,
                rank: r.rank,
                oldRating: r.oldRating,
                newRating: r.newRating,
                updateTime: r.ratingUpdateTimeSeconds
            }))
        };

    } catch (error) {
        return {
            status: 'error',
            message: error.message
        };
    }
}

// CLI Runner for testing
const main = async () => {
    const handle = process.argv[2];
    if (!handle) {
        console.log("Usage: node cf_scraper.js <handle>");
        return;
    }

    console.log(`Fetching data for ${handle}...`);
    const data = await getUserStats(handle);
    console.log(JSON.stringify(data, null, 2));
};

if (require.main === module) {
    main();
}

module.exports = { getUserStats };
