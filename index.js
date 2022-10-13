require("dotenv").config();
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const uri = process.env.CONNECTION_STRING;
const client = new MongoClient("mongodb+srv://lukasjojo98:johannes98@cluster0.9aafiqu.mongodb.net");
var vocabList = [];
async function run() {
  try {
    const database = client.db('ERBvocab');
    coll = database.collection('vocab');
    const cursor = coll.find();
    cursor.forEach(function(value){vocabList.push(value)});
            } 
    finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const session = require("express-session");
const { text } = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(session({secret: 'sh'}));
var sessionVariable;
app.get('/', (request, response) => {
    sessionVariable = request.session;
    var textObject =  vocabList[Math.trunc(Math.random() * vocabList.length)];
    return response.render("../pages/index.ejs", {textObject: textObject});
  });
app.post('/',  (request,response) => {
  var score = Object.entries(request.body)[1][0];
  var actualScore = 0.0;
  if(score == "Bad"){
    actualScore = 0.33;
  }
  else if(score == "Good"){
    actualScore = 0.66;
  }
  else if(score == "Perfect"){
    actualScore = 1.0;
  }
  var textObjectID = request.body["textObjectid"];
  coll.update(
    {_id: ObjectId(textObjectID)},
    { $set: {"Score": actualScore} },
    false,
    true
  );
  response.redirect("/");
        
});
app.get("/results", async (requst, response) => {
  vocabList = [];
  const database = client.db('ERBvocab');
  coll = database.collection('vocab');
  const cursor = coll.find();
  await cursor.forEach(function(value){vocabList.push(value)});
    return response.render("../pages/results.ejs",{textObjects: vocabList});
});

  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })