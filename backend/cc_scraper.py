import sys
import json
import requests
import re
from bs4 import BeautifulSoup

def get_codechef_stats(handle):
    try:
        url = f"https://www.codechef.com/users/{handle}"
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        
        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            return {"status": "error", "message": f"Failed to fetch profile. Status code: {response.status_code}"}
            
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Rating
        rating_div = soup.find('div', class_='rating-number')
        if not rating_div:
            return {"status": "error", "message": "User not found or no rating"}
            
        current_rating = int(rating_div.text.strip())
        
        # Max Rating
        small_tags = soup.find('div', class_='rating-header').find_all('small')
        max_rating = "N/A"
        for tag in small_tags:
            if "Highest Rating" in tag.text:
                max_rating = int(tag.text.split()[-1].strip(')'))
                break
                
        # Stars
        stars = "1★"
        star_span = soup.find('span', class_='rating')
        if star_span:
            stars = star_span.text.strip()
            
        # Ranks
        global_rank = "N/A"
        country_rank = "N/A"
        rank_stats = soup.find('div', class_='rating-ranks')
        if rank_stats:
            ul = rank_stats.find('ul')
            if ul:
                lis = ul.find_all('li')
                for li in lis:
                    text = li.text
                    if "Global Rank" in text:
                        global_rank = li.find('strong').text.strip()
                    elif "Country Rank" in text:
                        country_rank = li.find('strong').text.strip()

        # History (Regex extraction)
        history = []
        scripts = soup.find_all('script')
        for script in scripts:
            if script.string and 'all_rating' in script.string:
                # Look for all_rating = [...];
                match = re.search(r'all_rating\s*=\s*(\[.*?\]);', script.string, re.DOTALL)
                if match:
                    json_str = match.group(1)
                    try:
                        raw_history = json.loads(json_str)
                        # Format: {"code": "CONTEST", "getyear": "2021", "getmonth": "01", "getday": "01", "rating": "1500", "rank": "100", "name": "..."}
                        for entry in raw_history:
                            history.append({
                                "contestName": entry.get("name", "Contest"),
                                "rating": int(entry.get("rating", 0)),
                                "rank": entry.get("rank", "0"),
                                "date": f"{entry.get('getyear')}-{entry.get('getmonth')}-{entry.get('getday')}"
                            })
                    except:
                        pass
                break

        return {
            "status": "success",
            "handle": handle,
            "rating": current_rating,
            "maxRating": max_rating,
            "stars": stars,
            "globalRank": global_rank,
            "countryRank": country_rank,
            "history": history
        }

    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"status": "error", "message": "No handle provided"}))
    else:
        handle = sys.argv[1]
        data = get_codechef_stats(handle)
        print(json.dumps(data, indent=2))
