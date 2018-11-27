#!/usr/bin/env bash
set -e

npm run build

echo "Exporting graphic component..."

cp -r build/static/js/graphic.*.js dist/js/graphic.js

echo "Process finished successfully!"
