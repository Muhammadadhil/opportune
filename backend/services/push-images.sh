#!/bin/bash

# did not tested this script yet

services=(
  "gateway-service:muhammadadhil/gateway"
  "user-service:muhammadadhil/opportune-userservice"
  "post-service:muhammadadhil/opportune-postservice"
  "contract-service:muhammadadhil/opportune-contractservice"
  "messaging-service:muhammadadhil/opportune-messagingservice"
  "payment-service:muhammadadhil/opportune-paymentservice"
  "manage-service:muhammadadhil/opportune-manageservice"
  "notification-service:muhammadadhil/opportune-notificationservice"
)

for service in "${services[@]}"; do
  service_name=$(echo "$service" | cut -d':' -f1)
  image_name=$(echo "$service" | cut -d':' -f2)

  # Get the current image ID if it exists
  current_id=$(docker images -q "$image_name:latest")

  echo "Building $service_name..."
  docker compose build "$service_name"

  # Get the new image ID
  new_id=$(docker images -q "$image_name:latest")

  # Only push if the image ID changed or if there was no previous image
  if [ "$current_id" != "$new_id" ] || [ -z "$current_id" ]; then
    echo "Changes detected in $service_name, pushing new image..."
    docker push "$image_name:latest"
    if [ $? -eq 0 ]; then
      echo "Successfully pushed $image_name!"
    else
      echo "Failed to push $image_name."
      exit 1
    fi
  else
    echo "No changes detected in $service_name, skipping push."
  fi
done

echo "Docker image operations completed!"











# # # Login to Docker Hub (or your private registry)
# # echo "Logging in to Docker Hub..."
# # docker login -u YOUR_DOCKERHUB_USERNAME -p YOUR_DOCKERHUB_PASSWORD

# # Define the services and their image names
# services=(
#   "gateway-service:muhammadadhil/gateway"
#   "user-service:muhammadadhil/opportune-userservice"
#   "post-service:muhammadadhil/opportune-postservice"
#   "contract-service:muhammadadhil/opportune-contractservice"
#   "messaging-service:muhammadadhil/opportune-messagingservice"
#   "payment-service:muhammadadhil/opportune-paymentservice"
#   "manage-service:muhammadadhil/opportune-manageservice"
#   "notification-service:muhammadadhil/opportune-notificationservice"
# )

# # Build and push each service
# for service in "${services[@]}"; do
#   service_name=$(echo "$service" | cut -d':' -f1)
#   image_name=$(echo "$service" | cut -d':' -f2)

#   echo "Building and pushing $service_name..."
#   docker compose build "$service_name"
#   docker tag "$image_name:latest" "$image_name:latest"
#   docker push "$image_name:latest"

#   if [ $? -eq 0 ]; then
#     echo "Successfully pushed $image_name!"
#   else
#     echo "Failed to push $image_name."
#     exit 1
#   fi
# done

# echo "All Docker images pushed successfully!"