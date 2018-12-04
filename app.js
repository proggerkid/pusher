let http = require('http');
let express = require('express');
let app = express();
let httpServer = http.createServer(app);
let fs = require('fs');
let session = require('express-session');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});
let multer = require('multer');
let handleUploadEngine = require('./handler/handleUploadEngine');
let handleRouting = require('./Routes/handleRouting');
let handleDB = require('./handleDB');
let handleRegistration = require('./handler/handleRegistration');
let handleLogin = require('./handler/handleLogin');
let handleUpload = require('./handler/handleUpload');

app.set('views', './views');
app.set('view engine', 'ejs');

handleDB.connectToDB(mongoose);
let User = handleDB.makeUser(mongoose);
let Upload = handleDB.makeUpload(mongoose);

let upload = handleUploadEngine(multer);

app.use(express.static('./public'));
app.use(session({
	secret: "lsdfjj893f29378dgf783gf78weggf378fg",
	resave: true,
	saveUninitialized: false
}));




handleRouting(app, fs, Upload);
handleRegistration(app, urlencodedParser, User);
handleLogin(app, urlencodedParser, User);
handleUpload(app, upload, fs, Upload);





httpServer.listen(8000);