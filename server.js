//Install express server
const express       = require('express');
const app 			= express();
const path 			= require('path');
const bodyParser    = require('body-parser');
const port          = 8080;

// Serve only the static files form the dist directory
app.use(express.static(path.join(__dirname + '/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/src/index.html'));
});

//getting routes API
var index = require('./server/routes/routes.js');
app.use('/',index);

//Start the app by listening on the default Heroku port
app.listen(process.env.PORT || port ,function(){
	console.log('Server started on port: ' + port + ' ' +__dirname );
});
