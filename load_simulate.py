import requests
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
# from multiprocessing import Pool

def test_api(endpoint):
    start_time = time.time()
    response = requests.get(endpoint)
    end_time = time.time()
    return end_time - start_time, response.status_code
    
def main():
    endpoint = "http://a71d1f8df5ffc4e5b8d498b2ba93fb7c-1163147152.ap-south-1.elb.amazonaws.com:3001/heavy-endpoint"  # Replace with your actual endpoint
    number_of_requests = 100  # Number of concurrent requests

    with ThreadPoolExecutor(max_workers=number_of_requests) as executor:
        futures = [executor.submit(test_api, endpoint) for _ in range(number_of_requests)]
        for future in as_completed(futures):
            response_time, status_code = future.result()
            print(f"Response time: {response_time} seconds, Status Code: {status_code}")

# def main():
#     endpoint = "http://a71d1f8df5ffc4e5b8d498b2ba93fb7c-1163147152.ap-south-1.elb.amazonaws.com:3001/heavy-endpoint"  # Replace with your actual endpoint
#     number_of_requests = 100  # Number of concurrent requests

#     with Pool(processes=number_of_requests) as pool:
#         results = pool.starmap(test_api, [(endpoint,)] * number_of_requests)

#     for result in results:
#         response_time, status_code = result
#         print(f"Response time: {response_time} seconds, Status Code: {status_code}")


if __name__ == "__main__":
    main()