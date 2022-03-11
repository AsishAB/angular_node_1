const express = require('express')

const port = process.env.PORT || 3000;
// const db = require("./server");

//const routes = require("./routes");
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json());
const path = require('path');

// app.use('/file_uploads', express.static(path.join("storage/file_uploads")));

app.use('/file_uploads', express.static("storage/file_uploads"));
app.use('/profile_image', express.static(path.join("storage/profile_image")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST,PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});


// app.use(routes);
app.use('/', require('./routes/posts.js'));
app.use('/users/', require('./routes/user'));
app.use('/ext-api/', require('./routes/ext_api_call'));
app.use('/login/', require('./routes/login'));

app.listen(port, () => {
  console.log(`Node Server listening at http://localhost:${port}`)
});

module.exports = app;