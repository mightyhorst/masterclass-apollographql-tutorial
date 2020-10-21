#!/bin/bash
echo "🚀 Start the server..."
yarn workspace @masterclass-apollo/server start
echo "💬 Send Query to GraphQL..."
curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' -H 'authorization: ZGFpc3lAYXBvbGxvZ3JhcGhxbC5jb20=' --data-binary '{"query":"mutation BookTrips {\n  bookTrips(launchIds: [67, 68, 69]) {\n    success\n    message\n    launches {\n      id\n    }\n  }\n}"}' --compressed
