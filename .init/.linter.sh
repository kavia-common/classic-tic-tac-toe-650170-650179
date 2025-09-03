#!/bin/bash
cd /tmp/kavia/workspace/code-generation/classic-tic-tac-toe-650170-650179/frontend_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

