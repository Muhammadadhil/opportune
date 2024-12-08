#!/bin/bash

API_GATEWAY_PATH="./gateway"
USER_SERVICE_PATH="./services/userService"
MANAGE_SERVICE_PATH="./services/manageService"
JOBANGGIG_SERIVE_PATH="./services/jobandGigService"

echo "Starting apiGateway..."
(cd "$API_GATEWAY_PATH" && npm run dev) &

echo "Starting userService..."
(cd "$USER_SERVICE_PATH" && npm run dev) &

echo "Starting manageService..."
(cd "$MANAGE_SERVICE_PATH" && npm run dev) &

echo "Starting jobAndGigService..."
(cd "$JOBANGGIG_SERIVE_PATH" && npm run dev) &

wait
echo "All services are now running."
