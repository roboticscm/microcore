BUILD_DIR=build

run:
	go run main.go
dev:
	reflex -r '\.go' -s -- sh -c "go run main.go"

docker: 
	docker rm -f messaging || true
	docker image rm -f messaging || true
	docker build -t messaging -f Dockerfile.multistage .
	docker run -d --rm  -p 3002:3002 --name messaging  messaging