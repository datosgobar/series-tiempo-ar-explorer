#!/usr/bin/env bash
set -e

rm -rf dist
npm run build


echo "Creating release folder structure..."

mkdir -p dist/css dist/js

cp -r build/assets/ico dist/
cp -r build/assets/images dist/
cp -r build/static/css/main.*.css dist/css/main.css
cp -r build/static/js/main.*.js dist/js/main.js

echo "Release finished successfully!"
