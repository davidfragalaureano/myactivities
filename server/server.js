//Install express server
const express       = require('express');
const app 			= express();
const path 			= require('path');
const bodyParser    = require('body-parser');

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));


//Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4200 ,function(){
	console.log('Server started on port: ' + port + ' ' +__dirname );
});
