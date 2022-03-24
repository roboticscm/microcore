start:
	yarn
	yarn dev

find-pid:
	netstat -ano | findstr :3000

kill-pid:
	taskkill /F /PID $i

kill-port:
	kill -9 $$(lsof -t -i:3000)