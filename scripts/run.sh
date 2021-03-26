#!/bin/bash

if [ $# -eq 0 ]
  then
    docker-compose build --build-arg environment=dev && docker-compose up

elif [ $# -eq 1 ]
  then
    docker-compose build --build-arg environment="$1" && docker-compose up

elif [ $# -gt 1 ]
  then
    ENV=$1
    shift
    for var in "$@"
    do
        docker-compose run -e ENVIRONMENT="$ENV" "$var"
    done
fi