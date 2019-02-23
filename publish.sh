#!/usr/bin/env bash

#rm -rf ./playground/node_modules

rm -rf ./lib && npm build

npm publish --registry http://registry.npmjs.org
