#!/usr/bin/env sh

set -e

npm install
sh scripts/tests.sh
sh scripts/tslint.sh
sh scripts/jscpd.sh

