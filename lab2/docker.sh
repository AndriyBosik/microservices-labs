#!/bin/bash

docker build -t service/post -f Dockerfile post-service/.
docker build -t service/fake-post -f Dockerfile fake-post-service/.
docker build -t service/profile -f Dockerfile profile-service/.
