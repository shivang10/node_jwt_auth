require("./db/db_connect");
const app = require("./app");

app.listen(5000, () => {
    console.log("server is running")
});