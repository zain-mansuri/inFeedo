# inFeedo

## Tools & Technology 💻
### Backend 🧑🏻‍💻
#### Node.Js(express)
### Database 📝
#### SqlLite3 (MySql)

## How to Start This in Local Machine ???? 🤔

1. ```npm install```

2. ```npm start```  this will start in dev environment 

This will install dependency and start server in 3001.

http://localhost:3001/

### Create task
```
curl --location 'http://localhost:3001/task/' \
--header 'Content-Type: application/json' \
--data '{
    "title" : "one",
    "description" : "desc"
}'
```

### Get One Task By Id
```
curl --location --request GET 'http://localhost:3001/task/1' \
--header 'Content-Type: application/json' \
--data '{
    "title" : "one",
    "description" : "desc"
}'
```

### Update Task -  Possible Update status(open, close, continue)
```
curl --location --request PUT 'http://localhost:3001/task/1' \
--header 'Content-Type: application/json' \
--data '{
    "status": "continue"
}'
```

### Get By Pagination
```
curl --location 'http://localhost:3001/task/all/5/1' \
--data ''
```

### Get Metrics data - No Filter
```
curl --location 'http://localhost:3001/task/report/metrics' \
--data ''
```

### Get Metrics data - Add Date Filter
```
curl --location --request GET 'http://localhost:3001/task/report/metrics' \
--header 'Content-Type: application/json' \
--data '{
    "date": "2024-10-10"
}'
```

Created By Zain Mansuri 🐉
