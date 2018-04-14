//Install express server
const express       = require('express');
const app 			= express();
const path 			= require('path');
const bodyParser    = require('body-parser');
const port          = 8080;
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));


//Start the app by listening on the default Heroku port
app.listen(process.env.PORT || port ,function(){
	console.log('Server started on port: ' + port + ' ' +__dirname );
});
