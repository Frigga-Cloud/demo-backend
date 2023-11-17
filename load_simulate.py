import requests
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

def test_api(endpoint):
    start_time = time.time()
    response = requests.get(endpoint)
    end_time = time.time()
    return end_time - start_time, response.status_code
    
def main():
    endpoint = "https://demo-api.frigga.cloud/heavy-endpoint"  # Replace with your actual endpoint
    number_of_requests = 100  # Number of concurrent requests

    with ThreadPoolExecutor(max_workers=number_of_requests) as executor:
        futures = [executor.submit(test_api, endpoint) for _ in range(number_of_requests)]
        for future in as_completed(futures):
            response_time, status_code = future.result()
            print(f"Response time: {response_time} seconds, Status Code: {status_code}")

if __name__ == "__main__":
    main()