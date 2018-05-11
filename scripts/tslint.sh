#!/usr/bin/env bash
set -e
DIR=$(dirname "$0")
cd ${DIR}/..

echo "Running tslint"
npm run tslint
echo "tslint OK :)"


