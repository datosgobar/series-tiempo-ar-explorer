#!/usr/bin/env bash
set -e

echo "Creating release folder structure..."

mkdir -r dist
cp -r build/assets/ico dist/
cp -r build/assets/images dist/
cp -r build/static/js dist/
cp -r build/dist/css dist/

echo "Release finished successfully!"
