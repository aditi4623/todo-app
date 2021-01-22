const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { ADD_TASK, GET_TASK, EDIT_TASK, DELETE_TASK,MARK_COMPLETE } = require("./controller/event");

app.get("/", GET_TASK);
app.post("/", ADD_TASK);
app.put("/:id", EDIT_TASK);
app.put("/complete/:id", MARK_COMPLETE);
app.delete("/:id", DELETE_TASK);

app.listen(PORT, () => {
  console.log("Server is running at " + PORT);
});
