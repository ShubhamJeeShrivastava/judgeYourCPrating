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

        const response = await axios.post('https://leetcode.com/graphql', {
            query,
            variables: { username }
        });

        const data = response.data.data;

        if (!data.matchedUser) {
            return { status: 'error', message: 'User not found' };
        }

        const contestRanking = data.userContestRanking || {};
        const history = data.userContestRankingHistory || [];

        const attendedHistory = history
            .filter(h => h.attended)
            .map(h => ({
                contestName: h.contest.title,
                rating: Math.round(h.rating),
                ranking: h.ranking,
                startTime: h.contest.startTime
            }));

        return {
            status: 'success',
            handle: data.matchedUser.username,
            rating: contestRanking.rating ? Math.round(contestRanking.rating) : 'N/A',
            globalRanking: contestRanking.globalRanking || 'N/A',
            history: attendedHistory
        };

    } catch (error) {
        return {
            status: 'error',
            message: error.message
        };
    }
}

module.exports = { getLeetCodeStats };
