let express = require("express");
let os = require("os");

let app = express();

app.get("/data",(req,res) => {
    res.send(Date());
});
app.get("/usuaris",(req,res) => {
    res.send(os.userInfo().username);
});
app.listen(8080);