const express = require ('express');
const app = express ();
const bodyparser = require ('body-parser');
const db = require ('./models');
const cors = require ('cors');
require('dotenv').config();

app.use (cors ());

const port = process.env.PORT || 8085;
app.use (bodyparser.urlencoded ({extended: false}));
app.use (bodyparser.json ());

db.mongoose
  .connect (db.url)
  .then (() => {
    console.log ('connected to mongodb Atlas server');
  })
  .catch (err => {
    console.log ('server is not connected ', err);

  });

require ('./routes/form.routes') (app);

app.listen (port, () => {
  console.log ('server is running on port:',port);
});
