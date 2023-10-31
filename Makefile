docker-build: 
	docker build -t backend-demo .

docker-run: 
	docker run --rm -p 3001:3001 --env-file .env -it backend-demo:latest