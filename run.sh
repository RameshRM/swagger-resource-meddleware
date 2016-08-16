#!/bin/bash

if [ -d "node_modules" ]; then
  echo "*** Removing existing node_modules ***"
  rm -rf node_modules

fi

npm install --production

SPEC=$1
echo '*** Spec File Is: ***' $SPEC

export SPEC_FILE=$SPEC
export DEBUG=swagger-mock-server

echo '*** Start Server ***'
npm start
