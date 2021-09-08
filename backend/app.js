const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const router = require("./routes");
const auth = require("./auth");

app.use(cookieParser("no_secret"));
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
auth.init(app);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
app.use("/", router);

const homeFunc = (_, res) => {
  res.send("Hello World!");
};

app.get("/", homeFunc);

app.post("/test", (req, res) => {
  res.status(401).json({ requestBody: req.body });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
