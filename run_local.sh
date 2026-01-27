#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 CUEpoint.ai - Local Development Starter${NC}"
echo "========================================"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running.${NC}"
    echo "Please start Docker Desktop and try again."
    exit 1
fi

echo -e "${YELLOW}🔄 Stopping any existing containers...${NC}"
docker-compose down

echo -e "${YELLOW}🏗️  Building and starting services...${NC}"
echo "This may take a few minutes on the first run."

# Run docker-compose up with build
# Use --remove-orphans to clean up
docker-compose up --build --remove-orphans

# Note: The script will stay attached to show logs. 
# Ctrl+C will stop the containers comfortably if using normal up.
