curl --silent localhost:3000/users
# "results":[{"id":"90bf10a3-c9fb-406a-a35a-3e4a8db0fbf8","name":"Batman","age":50},{"id":"cb506c7d-1c2f-4ce8-a56f-d45f16bf34cf","name":"Batman","age":50}]}

curl \
  --silent \
  -X POST \
  -d '{"name": "medina", "age": 22}' \
  localhost:3000/users
# {"id":"6bec69a2-2c42-4793-bdbb-cc4aa01509c8","success":"User created with success!!"}

curl \
  --silent \
  -X POST \
  -d '{"invalid json payload"}' \
  localhost:3000/users

# {"error":"internet server error!!"}%  