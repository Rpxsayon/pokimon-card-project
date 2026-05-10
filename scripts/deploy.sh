#!/bin/bash

set -e

APP_NAME="pokimon-app"
PROJECT_DIR="pokimon-card-project"

echo "****** DEPLOYMENT STARTED *******"
cd /home/ubuntu

if [[ -d "$PROJECT_DIR" ]]
then
    echo "Removing old Projects..."
    rm -rf $PROJECT_DIR
fi

echo "Cloning latest code"
git clone https://github.com/Rpxsayon/pokimon-card-project.git

cd $PROJECT_DIR

echo "Stopping old container"
docker stop $APP_NAME || true
docker rm $APP_NAME || true


echo "Building Docker image"
docker build -t $APP_NAME

echo "Running new Container" 
docker run -d --name $APP_NAME -p 8080:80 $APP_NAME

echo "********* DEPLOYMENT COMPLETED **********" 


