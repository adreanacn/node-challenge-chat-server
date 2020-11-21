const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors");
const welcomeMessage = require("./welcomeMessage.json");
const fileSys = require("body-parser")
const fs = require("fs");

const app = express();

app.use(cors());
app.use(bodyParser.json());

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.


app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});


app.get("/welcome", function (request, response) {
  response.send(welcomeMessage);
});

app.post("/welcome/post", function (request, response) {
  const postContent = request.body;
  const filterMessage = welcomeMessage.filter((el) => el.id === postContent.id)
  const newMessage = welcomeMessage;
  newMessage.push(postContent);
  fs.writeFileSync("./welcomeMessage.json", JSON.striy(newMessage));
  console.log(newMessage);
  response.send(postContent);

});

/*/app.delete("/welcome/delete/:id", (req, res) => {
  const id = req.params.id;
  const filteredMessage = welcomeMessage.filter(message => message.id !== id);
  res.send(filteredMessage);
});/*/



// app.get("/welcome/:id", function (request, response) {
//const id = request.params.id;

//});

app.listen(3001, () => {
  console.log("escuchando en el puerto 3001")
});



