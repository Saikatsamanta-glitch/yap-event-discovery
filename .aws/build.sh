#!/bin/bash

################################################
#                                              #
#       DO NOT CHANGE CODE BELOW THIS          #
#                                              #
################################################


# Print NPM version
echo "<====> Print npm version <====>"
npm --version

# Clear any previous builds or node_modules
echo "<====> Cleanup any previous builds <====>"
rm -rf node_modules out

# Install npm packages for x64 architecture with linux platform silently
echo "<====> Install npm packages <====>"
npm install --arch=x64 --platform=linux --silent

# Create a build package
echo "<====> Create a build <====>"
npm run build
