#!/usr/bin/env bash
set -e

npm run build

echo "Exporting components..."

cp -r build/static/js/components.*.js dist/js/components.js

echo "Process finished successfully!"
