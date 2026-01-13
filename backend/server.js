const express = require('express');
const cors = require('cors');
const { getUserStats } = require('./cf_scraper');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.post('/api/analyze', async (req, res) => {
    const { cfId, lcId, ccId } = req.body;

    const results = {};

    try {
        if (cfId) {
            console.log(`Fetching Codeforces data for: ${cfId}`);
            const cfData = await getUserStats(cfId);
            if (cfData.status === 'success') {
                results.cf = cfData;
            } else {
                results.cf = { error: cfData.message };
            }
        }

        // Placeholders for other platforms
        if (lcId) {
            results.lc = { message: "LeetCode scraping not implemented yet", handle: lcId };
        }
        if (ccId) {
            results.cc = { message: "CodeChef scraping not implemented yet", handle: ccId };
        }

        res.json(results);
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
