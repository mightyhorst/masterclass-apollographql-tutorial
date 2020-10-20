#!/bin/bash
echo "🚀 Start the server..."
yarn workspace @masterclass-apollo/server start
echo "💬 Send Query to GraphQL..."
curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"query GetLaunchById($id: ID!) {\n  launch(id: $id) {\n    id\n    rocket {\n      id\n      type\n    }\n  }\n}","variables":{"id":60}}' --compressed
