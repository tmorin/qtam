#!/usr/bin/env bash

set -euxo pipefail

npm install --ci

npm run bindex
npm run bstyle
npm run bsitemap

rm -rf static
cp src/ static/ -r

rm static/_main.html
