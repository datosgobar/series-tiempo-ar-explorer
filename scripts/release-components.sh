#!/usr/bin/env bash
set -e

npm run build

echo "Exporting components..."

cp -r build/static/js/components.*.js dist/js/components.js
cp -r build/assets/css/components.css dist/css/components.css

echo "Process finished successfully!"
