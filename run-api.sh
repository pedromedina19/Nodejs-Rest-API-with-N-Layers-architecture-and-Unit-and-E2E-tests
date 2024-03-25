curl --silent localhost:3000/users

curl \
  --silent \
  -X POST \
  -d '{"name": "medina", "age": 22}' \
  localhost:3000/users

curl \
  --silent \
  -X POST \
  -d '{"invalid json payload"}' \
  localhost:3000/users

