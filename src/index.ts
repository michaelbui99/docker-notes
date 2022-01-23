import express from "express";
import { MongoClient } from "mongodb";

const path = require("path");

const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());

app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/user", (_req, res) => {
    MongoClient.connect(
        "mongodb://admin:password@localhost:27017",
        (err, client) => {
            if (err) {
                console.error(err);
            }

            const db = client?.db("user-account");
            const query = { userid: 1 };
            db?.collection("users").findOne(query, (err, result) => {
                if (err) {
                    console.log(err);
                }
                client?.close();
                res.send(result);
            });
        }
    );
});

app.put("/api/user", (req, res) => {
    const newUserDetails = req.body;

    console.log("Connecting to db...");

    MongoClient.connect(
        "mongodb://admin:password@localhost:27017",
        (err, client) => {
            if (err) {
                console.error(err);
            }

            const db = client?.db("user_account");
            newUserDetails["userid"] = 1;

            var query = { userid: 1 };
            var newValues = { $set: newUserDetails };

            console.log("Connected");

            db?.collection("users").updateOne(
                query,
                newValues,
                { upsert: true },
                function (err, _result) {
                    if (err) {
                        console.error(err);
                    }

                    client?.close();
                    res.send(newUserDetails);
                }
            );
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
