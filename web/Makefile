start:
	yarn
	yarn dev

find-pid:
	netstat -ano | findstr :3000

kill-pid:
	taskkill /F /PID $i

kill-port:
	kill -9 $$(lsof -t -i:3000)

docker-build:
	docker rm -f node-server || true
	docker image rm -f node-server || true
	docker build -t node-server -f Dockerfile .

docker-run:
	cp -Rf ./start.sh ./build
	docker run \
	-p 80:3000 \
	-v "build":/app --name node-server5 node-server