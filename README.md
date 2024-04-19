# cookbook

# Database

Details taken from [MongoDB official web site](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu)

## 1. Start MongoDB

Start the mongod by running the following command:

```bash
sudo systemctl start mongod
```

If you receive an error similar to the following when starting mongod:

`Failed to start mongod.service: Unit mongod.service not found.`

Run the following command first:

```bash
sudo systemctl daemon-reload
```

Then run the start command above again.

## 2. Verify that MongoDB has started successfully

```bash
sudo systemctl status mongod
```

You can optionally ensure that MongoDB will start following a system reboot by issuing the following command:

```bash
sudo systemctl enable mongod
```

## 3. Stop MongoDB
As needed, you can stop the mongod process by issuing the following command:

```bash
sudo systemctl stop mongod
```

## 4. Restart MongoDB

You can restart the mongod process by issuing the following command:

```bash
sudo systemctl restart mongod
```

You can follow the state of the process for errors or important messages by watching the output in the /var/log/mongodb/mongod.log file.

## 5. Begin using MongoDB
Start a mongosh session on the same host machine as the mongod. You can run mongosh without any command-line options to connect to a mongod that is running on your localhost with default port 27017.

```bash
mongosh
```

For more information visit [MongoDB official web site](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu)







