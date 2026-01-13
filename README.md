# JudgeYourCPRating

JudgeYourCPRating is a competitive programming dashboard that aggregates your profiles from **Codeforces**, **CodeChef**, and **LeetCode**. It provides a unified view of your ratings, rankings, and performance trajectory across these platforms.

![Dashboard Preview](./dashboard_preview.png)

## Features

- **Unified Dashboard**: View stats from all three major platforms in one place.
- **Visual Trajectory**: Interactive graphs showing your rating history over time.
- **Global Rankings**: Track your global standing on LeetCode and CodeChef.
- **AI Insights**: Get AI-generated analysis of your competitive programming journey (Coming Soon).

## Data Fetching Methodology

JudgeYourCPRating uses a hybrid approach to fetch data, respecting the availability of public APIs for each platform.

### Periodicity & Caching
- Data is fetched in real-time when the user clicks "Analyze" or "Update".
- No persistent database is currently used; data is session-based.

### 1. Codeforces
**Method**: Official API
- **Endpoint**: `https://codeforces.com/api/`
- **Details**: 
  - `user.info`: Fetches current rating, rank, and profile photo.
  - `user.rating`: Fetches complete contest history to generate the rating graph.
- **Implementation**: Node.js (`axios`) in `backend/cf_scraper.js`.

### 2. LeetCode
**Method**: GraphQL API
- **Endpoint**: `https://leetcode.com/graphql`
- **Details**: 
  - Uses reverse-engineered GraphQL queries to fetch public profile data.
  - Query `getUserProfile`: Fetches basic profile info.
  - Query `userContestRankingHistory`: Fetches contest attendance, ratings, and global ranking.
- **Implementation**: Node.js (`axios`) in `backend/lc_scraper.js`.

### 3. CodeChef
**Method**: Web Scraping (Python)
- **Target**: `https://www.codechef.com/users/{handle}`
- **Details**: 
  - Since CodeChef does not provide a public API for user stats, we use a Python script to scrape the public profile page.
  - **Tools**: `requests` for fetching HTML and `BeautifulSoup4` for parsing.
  - **History Extraction**: Contest history is extracted by parsing the embedded JavaScript variable `all_rating` from the page source using Regex.
- **Implementation**: Python script (`backend/cc_scraper.py`) spawned as a child process by the Node.js server.

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS, Recharts, Framer Motion
- **Backend**: Node.js, Express
- **Scraping**: Python (BeautifulSoup), Axios

## Setup & Run

1. **Backend**:
   ```bash
   cd backend
   npm install
   pip install requests beautifulsoup4
   npm start
   ```
   Server runs on `http://localhost:5001`.

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   App runs on `http://localhost:5173`.
