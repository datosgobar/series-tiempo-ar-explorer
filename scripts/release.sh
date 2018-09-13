#!/usr/bin/env bash
set -e

npm run build

echo "Creating release folder structure..."

mkdir -p dist/css dist/js

cp -r build/assets/ico dist/
cp -r build/assets/images dist/
cp -r build/static/css/main.*.css dist/css/main.css
cp -r build/static/js/main.*.js dist/js/main.js

mkdir -p dist/fonts/roboto dist/fonts/gotham
cp -r build/assets/fonts/roboto/* dist/fonts/roboto/
cp -r build/assets/fonts/gotham/* dist/fonts/gotham/

echo "Release finished successfully!"
