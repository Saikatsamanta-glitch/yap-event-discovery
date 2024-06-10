.PHONY: build-development
build-development: ## Build the development docker image.
	docker build -f docker/development/Dockerfile -t development-event-discovery-module:latest --build-arg NPM_TOKEN=$NPM_TOKEN .

.PHONY: start-development
start-development: ## Start the development docker container.
	docker compose --file docker/development/docker-compose.yml up -d

.PHONY: stop-development
stop-development: ## Stop the development docker container.
	docker compose --file docker/development/docker-compose.yml down

.PHONY: build-staging
build-staging: ## Build the staging docker image.
	docker build -f docker/staging/Dockerfile -t staging-event-discovery-module:latest  --build-arg NPM_TOKEN=$NPM_TOKEN .

.PHONY: start-staging
start-staging: ## Start the staging docker container.
	docker compose --file docker/staging/docker-compose.yml up -d

.PHONY: stop-staging
stop-staging: ## Stop the staging docker container.
	docker compose --file docker/staging/docker-compose.yml down
  
.PHONY: build-production
build-production: ## Build the production docker image.
	docker build -f docker/production/Dockerfile -t production-event-discovery-module:latest --build-arg NPM_TOKEN=$NPM_TOKEN .

.PHONY: start-production
start-production: ## Start the production docker container.
	docker compose --file docker/production/docker-compose.yml up -d

.PHONY: stop-production
stop-production: ## Stop the production docker container.
	docker compose --file docker/production/docker-compose.yml down
