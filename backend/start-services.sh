#!/bin/bash

API_GATEWAY_PATH="./gateway"
USER_SERVICE_PATH="./services/userService"
MANAGE_SERVICE_PATH="./services/manageService"
JOBANGGIG_SERIVE_PATH="./services/jobandGigService"
CONTRACT_SERVICE_PATH='./services/contractService'
PAYMENT_SERVICE_PATH='./services/paymentService'
NOTIFICATION_SERVICE_PATH='./services/notificationService'
MESSAGING_SERVICE_PATH='./services/messagingService'


echo "Starting apiGateway..."
(cd "$API_GATEWAY_PATH" && npm run dev) &

echo "Starting userService..."
(cd "$USER_SERVICE_PATH" && npm run dev) &

echo "Starting manageService..."
(cd "$MANAGE_SERVICE_PATH" && npm run dev) &

echo "Starting jobAndGigService..."
(cd "$JOBANGGIG_SERIVE_PATH" && npm run dev) &

echo "Starting contractService..."
(cd "$CONTRACT_SERVICE_PATH" && npm run dev) &

echo "Starting paymentService..."
(cd "$PAYMENT_SERVICE_PATH" && npm run dev) &

echo "Starting notificationService..."
(cd "$NOTIFICATION_SERVICE_PATH" && npm run dev) &

echo "Starting messaging service ... "
(cd "$MESSAGING_SERVICE_PATH" && npm run dev) &

wait
echo "All services are now running."



# stripe listen --forward-to localhost:4004/payment/webhook