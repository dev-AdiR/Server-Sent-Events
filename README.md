
## Run Locally

Clone the project and install relevent dependencies on both client and server


Run mongodb as a replica set

```bash
  sudo mongod --port 27017 --dbpath /data/db/ --replSet rs0
```

Start the server

```bash
  npm run start
```

Start the client
```bash
  npm run start
```

Once the client server start enter some dummy names and refresh. Once you see some records in the list open Mongodb Compass or any GUI tool you might use and manually change a record in the `dummies` collection inside `serve-sent-db` database (it is a typo, it should be server-sent-db. Sorry!) and observe the list in the client, if it changes when you change the record directly in DB then that means its working
