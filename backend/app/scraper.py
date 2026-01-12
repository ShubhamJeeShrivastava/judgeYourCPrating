import requests
from bs4 import BeautifulSoup
import time

def get_codeforces_data(username: str):
    """
    Fetch user data from Codeforces API.
    """
    try:
        url = f"https://codeforces.com/api/user.info?handles={username}"
        response = requests.get(url, timeout=10)
        data = response.json()
        if data["status"] == "OK":
            user = data["result"][0]
            # Get rating history for max rating
            rating_url = f"https://codeforces.com/api/user.rating?handle={username}"
            rating_resp = requests.get(rating_url, timeout=10)
            rating_hist = rating_resp.json().get("result", [])
            
            return {
                "platform": "Codeforces",
                "username": username,
                "rating": user.get("rating", 0),
                "rank": user.get("rank", "unrated"),
                "max_rating": user.get("maxRating", 0),
                "history": [{"newRating": r["newRating"], "updateTime": r["ratingUpdateTimeSeconds"]} for r in rating_hist]
            }
        return {"error": "User not found or API error"}
    except Exception as e:
        return {"error": str(e)}

def get_leetcode_data(username: str):
    """
    Fetch LeetCode data using GraphQL.
    """
    url = "https://leetcode.com/graphql"
    query = """
    query userPublicProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          ranking
          reputation
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
      }
      userContestRanking(username: $username) {
        rating
        globalRanking
        topPercentage
      }
    }
    """
    try:
        response = requests.post(url, json={'query': query, 'variables': {'username': username}}, timeout=10)
        data = response.json()
        
        if "data" in data and data["data"].get("matchedUser"):
            user = data["data"]["matchedUser"]
            contest = data["data"].get("userContestRanking") or {}
            stats = user["submitStats"]["acSubmissionNum"]
            
            total_solved = next((s["count"] for s in stats if s["difficulty"] == "All"), 0)
            
            return {
                "platform": "LeetCode",
                "username": username,
                "rating": int(contest.get("rating", 0)) if contest else 0,
                "global_rank": contest.get("globalRanking", 0),
                "total_solved": total_solved,
                "easy": next((s["count"] for s in stats if s["difficulty"] == "Easy"), 0),
                "medium": next((s["count"] for s in stats if s["difficulty"] == "Medium"), 0),
                "hard": next((s["count"] for s in stats if s["difficulty"] == "Hard"), 0),
            }
        return {"error": "User not found"}
    except Exception as e:
        return {"error": str(e)}

def get_codechef_data(username: str):
    """
    Scrape CodeChef data.
    Note: CodeChef scraping is fragile and may break with UI changes.
    """
    url = f"https://www.codechef.com/users/{username}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code != 200:
             return {"error": "User not found"}
             
        soup = BeautifulSoup(response.content, "html.parser")
        
        # Rating
        rating_div = soup.find("div", class_="rating-number")
        rating = int(rating_div.text.strip()) if rating_div else 0
        
        # Stars
        stars_span = soup.find("span", class_="rating")
        stars = stars_span.text.strip() if stars_span else "Unrated"
        
        # Global/Country Rank
        ranks = soup.find_all("strong") # Very generic, need to be careful. CodeChef structure varies.
        # Better: Search for specific sidebar items
        
        return {
            "platform": "CodeChef",
            "username": username,
            "rating": rating,
            "stars": stars,
            # "html_snippet": str(soup)[:500] # Debug
        }
    except Exception as e:
        return {"error": str(e)}
