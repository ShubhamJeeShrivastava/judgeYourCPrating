const axios = require('axios');

async function getLeetCodeStats(username) {
    try {
        const query = `
            query getUserProfile($username: String!) {
                matchedUser(username: $username) {
                    username
                    profile {
                        ranking
                    }
                }
                userContestRanking(username: $username) {
                    rating
                    globalRanking
                }
            }
        `;

        const response = await axios.post('https://leetcode.com/graphql', {
            query,
            variables: { username }
        });

        const data = response.data.data;

        if (!data.matchedUser) {
            return { status: 'error', message: 'User not found' };
        }

        const contestRanking = data.userContestRanking || {};

        return {
            status: 'success',
            handle: data.matchedUser.username,
            rating: contestRanking.rating ? Math.round(contestRanking.rating) : 'N/A',
            globalRanking: contestRanking.globalRanking || 'N/A',
            // No history in public API easily, simplistic version for now
            history: []
        };

    } catch (error) {
        return {
            status: 'error',
            message: error.message
        };
    }
}

module.exports = { getLeetCodeStats };
