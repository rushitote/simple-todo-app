const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());

const homeFunc = (_, res) => {
  res.send("Hello World!");
};

app.get("/*", homeFunc);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
