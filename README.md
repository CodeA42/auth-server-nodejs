# auth-server-nodejs

# How to run

## .env

### Create ".env" config folder with the following fields

```
PORT=
saltRounds=
accessTokenDuration=10m
refreshTokenDuration=30d
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
adminUsername=
adminPassword=
adminMail=
```

Access and Refresh token values are interpreted by [zeit/ms](https://github.com/vercel/ms)

## DB

### Create a databaase and user with the rights to work on the database

### Create "db.connection.json" config folder with the following info

```
{
    "host": "",
    "port": ,
    "username": "",
    "password": "",
    "database": ""
}
```

npm install
npm start
