#!/bin/bash

docker build -t service/post -f Dockerfile post-service/.
docker build -t service/profile -f Dockerfile profile-service/.
docker build -t blog/frontend frontend/.
