#!/bin/sh

sudo docker compose -f "$(dirname "$0")/docker-compose.yml" up -d ;

# wait until docker is up and running;
sleep 3;
# connect to database and execute file sql which creates/resets the db tables;
sudo psql -h 127.0.0.1 -U postgres -d billing_records -a -f "$(dirname "$0")/create_db.sql";
echo "Successfully create database and tables."