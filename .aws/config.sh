#!/bin/bash
export SERVICE_NAME=event-discovery-module
export CONTAINER_PORT=8156
export DATABASE_NAME=yap_core
export CPU=0
export MEMORY=10
export NPM_VERSION=$(awk -F\" '/"version":/ {print $4}' package.json)
