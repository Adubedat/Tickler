#!/bin/bash

if [ $# -eq 0 ]
  then
    docker-compose build --build-arg environment=dev && docker-compose up

elif [ $# -eq 1 ]
  then
  if [ $1 == "test" ] || [ $1 == "coverage" ]; then
    docker-compose -f docker-compose.test.yml build --build-arg environment="$1" && docker-compose up
  else
    docker-compose build --build-arg environment="$1" && docker-compose up
  fi

elif [ $# -gt 1 ]
  then
    ENV=$1
    shift
    for var in "$@"
    do
      if [ $ENV == "test" ] || [ $ENV == "coverage" ]; then
        docker-compose -f docker-compose.test.yml run -e ENVIRONMENT="$ENV" "$var"
      else
        docker-compose run -e ENVIRONMENT="$ENV" "$var"
      fi
    done
fi