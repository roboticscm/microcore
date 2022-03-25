start:
	yarn
	yarn dev

find-pid:
	netstat -ano | findstr :3000

kill-pid:
	taskkill /F /PID $i

kill-port-3000:
	kill -9 $$(lsof -t -i:3000)

kill-port-80:
	kill -9 $$(lsof -t -i:80)

docker-build:
	docker image rm -f node-server || true
	docker build -t node-server -f Dockerfile .

docker-run:
	docker rm -f node-server || true
	docker run -d \
	-p 80:3000 \
	-v "build":/app --name node-server node-server

docker: docker-build docker-run
