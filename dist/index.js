"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const path = require("path");
const app = (0, express_1.default)();
const PORT = 8080;
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/api/user", (_req, res) => {
    mongodb_1.MongoClient.connect("mongodb://admin:password@localhost:27017", (err, client) => {
        if (err) {
            console.error(err);
        }
        const db = client === null || client === void 0 ? void 0 : client.db("user-account");
        const query = { userid: 1 };
        db === null || db === void 0 ? void 0 : db.collection("users").findOne(query, (err, result) => {
            if (err) {
                console.log(err);
            }
            client === null || client === void 0 ? void 0 : client.close();
            res.send(result);
        });
    });
});
app.put("/api/user", (req, res) => {
    const newUserDetails = req.body;
    console.log("Connecting to db...");
    mongodb_1.MongoClient.connect("mongodb://admin:password@localhost:27017", (err, client) => {
        if (err) {
            console.error(err);
        }
        const db = client === null || client === void 0 ? void 0 : client.db("user-account");
        newUserDetails["userid"] = 1;
        var query = { userid: 1 };
        var newValues = { $set: newUserDetails };
        console.log("Connected");
        db === null || db === void 0 ? void 0 : db.collection("users").updateOne(query, newValues, { upsert: true }, function (err, _result) {
            if (err) {
                console.error(err);
            }
            client === null || client === void 0 ? void 0 : client.close();
            res.send(newUserDetails);
        });
    });
});
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map