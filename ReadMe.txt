### Install following pacakage to Run:

npm install express --save
npm install node-schedule --save
npm install mongoose --save
npm install fast-csv --save
npm install request --save

### Steps to Run 
Note : I used the mongodb as i have this installed and setup 
Starts the mongoDB ->

1) run mongodb from mongodb bin 
-if above cmd not work go to path mongodb/bin and excute mongodb.exe

2) node db/createDB.js 
- if the database not yet there 

Run the app : node app.js  
Server start at -> http://127.0.0.1:3001/


### APIS Descripttion : 

POST /butler HTTP/1.1
Host: 127.0.0.1
Content-Type: application/json
cache-control: no-cache
body: 
[
    {
        "clientId": 1,
        "requestId": "abc",
        "hours": 6
    },
    {
        "clientId": 2,
        "requestId": "ghi",
        "hours": 1
    },
    {
        "clientId": 1,
        "requestId": "def",
        "hours": 4
    },
    {
        "clientId": 1,
        "requestId": "zzz",
        "hours": 2
    }
]

------WebKitFormBoundary7MA4YWxkTrZu0gW--

GET /getCsv HTTP/1.1
Host: 127.0.0.1
cache-control: no-cache
response : 
	orderId,client.clientId,client.firstName,client.lastName,request,duration
	sample-123,client-321,Mike,S ,House Cleaning,2
	sample-144,client-271,Wilson,M,Office Cleaning,9