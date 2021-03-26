#!/bin/bash

if [ $# -eq 0 ]
  then
    docker-compose build --build-arg environment=test && docker-compose up
fi

for var in "$@"
do
    docker-compose run -e ENVIRONMENT=test "$var"
done