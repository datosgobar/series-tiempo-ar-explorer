#!/usr/bin/env bash
set -e
DIR=$(dirname "$0")
cd ${DIR}/..

echo "npm test"
npm test -- --forceExit --all
echo "npm test OK :)"
