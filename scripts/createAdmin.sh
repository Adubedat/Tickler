curl --header "Content-Type: application/json" --location \
--request POST 'http://localhost:3010/users' --data-raw '{
    "username": "admin",
    "password": "adminpwd",
    "role": "admin"
}'