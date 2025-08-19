import requests

GITHUB_API_URL = "https://api.github.com"

def search_github_repositories(query):
    headers = {
        "Accept": "application/vnd.github.v3+json",
    }

    params = {
        "q": query,
        "sort": "stars",
        "order": "desc",
        "per_page": 1000,
    }

    try:
        response = requests.get(f"{GITHUB_API_URL}/search/repositories", headers=headers, params=params)
        response.raise_for_status()

        return response.json()

    except requests.exceptions.HTTPError as http_err:
        return {"error": f"HTTP error occurred: {http_err}"}

    except requests.exceptions.RequestException as req_err:
        return {"error": f"Request error occurred: {req_err}"}

# Usage:
repos = search_github_repositories("django")
