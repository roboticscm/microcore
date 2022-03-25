GO_LANG_URL_MAC=https://golang.org/dl/go1.16.2.darwin-amd64.tar.gz
GO_LANG_URL_WIN=https://golang.org/dl/go1.16.windows-amd64.zip
GO_LANG_URL_LINUX=https://golang.org/dl/go1.16.2.linux-amd64.tar.gz
NODE_VERSION=v14.17.0
NODE_URL_MAC=https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}-darwin-x64.tar.gz
NODE_URL_WIN=https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}-win-x64.zip
NODE_URL_LINUX=https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}-linux-x64.tar.xz


env-bashrc:
	sudo touch ~/.bashrc
	sudo chmod 777 ~/.bashrc
	grep -F -- "export PATH=$$HOME/flutter/bin" ~/.bashrc || echo export PATH=$$HOME/flutter/bin:"$$"PATH >> ~/.bashrc
	grep -F -- "export PATH=$$HOME/flutter/.pub-cache/bin" ~/.bashrc || echo export PATH=$$HOME/flutter/.pub-cache/bin:"$$"PATH >> ~/.bashrc
	grep -F -- "export PATH=$$HOME/flutter/bin/cache/dart-sdk/bin" ~/.bashrc || echo export PATH=$$HOME/flutter/bin/cache/dart-sdk/bin:"$$"PATH >> ~/.bashrc
	grep -F -- "export PATH=$$HOME/go/bin" ~/.bashrc || echo export PATH=$$HOME/go/bin:"$$"PATH >> ~/.bashrc
	grep -F -- "export PATH=$$HOME/golang/go/bin" ~/.bashrc || echo export PATH=$$HOME/golang/go/bin:"$$"PATH >> ~/.bashrc
	
	grep -F -- "export PATH=$$HOME/Android/Sdk/platform-tools" ~/.bashrc || echo export PATH=$$HOME/Android/Sdk/platform-tools:"$$"PATH >> ~/.bashrc

	@if [ $(shell uname) == "Linux" ]; then \
		grep -F -- "export PATH=$$HOME/node/node-${NODE_VERSION}-linux-x64/bin" ~/.bashrc || echo export PATH=$$HOME/node/node-${NODE_VERSION}-linux-x64/bin:"$$"PATH >> ~/.bashrc; \
	else \
		grep -F -- "export PATH=$$HOME/node/node-${NODE_VERSION}-darwin-x64/bin" ~/.bashrc || echo export PATH=$$HOME/node/node-${NODE_VERSION}-darwin-x64/bin:"$$"PATH >> ~/.bashrc; \
	fi;

	source ~/.bashrc

env-profile:
	sudo touch ~/.profile
	sudo chmod 777 ~/.profile
	grep -F -- "export PATH=$$HOME/flutter/bin" ~/.profile || echo export PATH=$$HOME/flutter/bin:"$$"PATH >> ~/.profile
	grep -F -- "export PATH=$$HOME/flutter/.pub-cache/bin" ~/.profile || echo export PATH=$$HOME/flutter/.pub-cache/bin:"$$"PATH >> ~/.profile
	grep -F -- "export PATH=$$HOME/flutter/bin/cache/dart-sdk/bin" ~/.profile || echo export PATH=$$HOME/flutter/bin/cache/dart-sdk/bin:"$$"PATH >> ~/.profile
	grep -F -- "export PATH=$$HOME/go/bin" ~/.profile || echo export PATH=$$HOME/go/bin:"$$"PATH >> ~/.profile
	grep -F -- "export PATH=$$HOME/golang/go/bin" ~/.profile || echo export PATH=$$HOME/golang/go/bin:"$$"PATH >> ~/.profile
	grep -F -- "export PATH=$$HOME/Android/Sdk/platform-tools" ~/.profile || echo export PATH=$$HOME/Android/Sdk/platform-tools:"$$"PATH >> ~/.profile; 
	@if [ $(shell uname) == "Linux" ]; then \
		grep -F -- "export PATH=$$HOME/node/node-${NODE_VERSION}-linux-x64/bin" ~/.profile || echo export PATH=$$HOME/node/node-${NODE_VERSION}-linux-x64/bin:"$$"PATH >> ~/.profile; \
	else \
		grep -F -- "export PATH=$$HOME/node/node-${NODE_VERSION}-darwin-x64/bin" ~/.profile || echo export PATH=$$HOME/node/node-${NODE_VERSION}-darwin-x64/bin:"$$"PATH >> ~/.profile; \
	fi;
	source ~/.profile

env-etc-paths:
	sudo touch /etc/paths
	sudo chmod 777 /etc/paths
	grep -F -- "$$HOME/flutter/bin" /etc/paths || echo $$HOME/flutter/bin >> /etc/paths
	grep -F -- "$$HOME/flutter/.pub-cache/bin" /etc/paths || echo $$HOME/flutter/.pub-cache/bin >> /etc/paths
	grep -F -- "$$HOME/flutter/bin/cache/dart-sdk/bin" /etc/paths || echo $$HOME/flutter/bin/cache/dart-sdk/bin >> /etc/paths
	grep -F -- "$$HOME/go/bin" /etc/paths || echo $$HOME/go/bin >> /etc/paths
	grep -F -- "$$HOME/golang/go/bin" /etc/paths || echo $$HOME/golang/go/bin >> /etc/paths
	grep -F -- "$$HOME/Android/Sdk/platform-tools" /etc/paths || echo $$HOME/Android/Sdk/platform-tools >> /etc/paths

	@if [ $(shell uname) == "Linux" ]; then \
		grep -F -- "$$HOME/node/node-${NODE_VERSION}-linux-x64/bin" /etc/paths || echo $$HOME/node/node-${NODE_VERSION}-linux-x64/bin >> /etc/paths ;\
	else \
		grep -F -- "$$HOME/node/node-${NODE_VERSION}-darwin-x64/bin" /etc/paths || echo $$HOME/node/node-${NODE_VERSION}-darwin-x64/bin >> /etc/paths ;\
	fi;

env:
	@if [ "${OS}" != "Windows_NT" ] ; then\
		make env-bashrc;\
		make env-profile;\
		make env-etc-paths;\
	fi;

install-nodejs:
	rm -Rf ~/node
	rm -Rf ~/node.zip
	mkdir -p ~/node

	@if [  "${OS}" == "Windows_NT" ]; then \
		curl -L -o ~/node/node.zip ${NODE_URL_WIN}; \
		cd ~/node && unzip node.zip && rm -Rf node.zip; \
	elif [ "$(shell uname)" == "Linux" ]; then \
		curl -L -o ~/node/node.tar.xz ${NODE_URL_LINUX}; \
		cd ~/node && tar -xf node.tar.xz && rm -Rf node.tar.xz; \
	elif [ "$(shell uname)" == "Darwin" ]; then \
		curl -L -o ~/node/node.tar.gz ${NODE_URL_MAC}; \
		cd ~/node && tar -xf node.tar.gz && rm -Rf node.tar.gz; \
	fi;

	npm install -g yarn


install-postgres:
	docker run -d \
    --name postgres \
    -e POSTGRES_PASSWORD=1234 \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v d:/postgres_data:/var/lib/postgresql/data \
    -p 5432:5432 \
    postgres

install-go:
	rm -Rf ~/golang
	mkdir -p ~/golang
	@if [  "${OS}" == "Windows_NT" ]; then \
		curl -L -o ~/golang/golang.zip ${GO_LANG_URL_WIN}; \
		cd ~/golang && unzip golang.zip && rm -Rf golang.zip; \
	elif [ "$(shell uname)" == "Linux" ]; then \
		curl -L -o ~/golang/golang.tar.gz ${GO_LANG_URL_LINUX}; \
		cd ~/golang && tar -xf golang.tar.gz && rm -Rf golang.tar.gz; \
	elif [ "$(shell uname)" == "Darwin" ]; then \
		curl -L -o ~/golang/golang.tar.gz ${GO_LANG_URL_MAC}; \
		cd ~/golang && tar -xf golang.tar.gz && rm -Rf golang.tar.gz; \
	fi;