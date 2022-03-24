install-postgres:
	docker run -d \
    --name postgres \
    -e POSTGRES_PASSWORD=1234 \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v d:/postgres_data:/var/lib/postgresql/data \
    -p 5432:5432 \
    postgres