module.exports = function(app, fs, Upload){
	app.get('/', function(req, res){
		if(req.session.user != undefined){
			let profileData = {
			username: req.session.user.username,
			email: req.session.user.email
			};			
			res.render('index', {profile: profileData, status: `Welcome ${profileData.username}`});
		}
		else{	
			res.render('index', {status: ""});
		}
	});

	app.get('/registration', function(req, res){
	let errors = {
		username: false,
		email: false
	};
		if(req.session.user != undefined){
			let profileData = {
			username: req.session.user.username,
			email: req.session.user.email
			};			
			res.render('registration', {errors: errors ,profile: profileData});
		}
		else{
			res.render('registration', {errors: errors});
		}
	
	});

	app.get ('/login', function(req, res){
		if(req.session.user != undefined){
			let profileData = {
			username: req.session.user.username,
			email: req.session.user.email
			};			
			res.render('login', {profile: profileData});
		}
		else{
			res.render('login');	
		}
	});

	app.get('/upload', function(req, res){
		if(req.session.user == undefined){
			res.render('login');
		}
		else{
		let profileData = {
			username: req.session.user.username,
			email: req.session.user.email
		};
		let fileNames = fs.readdirSync('./public/upload');
		res.render('upload', {fileNames: fileNames, profile: profileData});	
		}
	});

	app.get('/profile', (req, res) => {
		if(req.session.user == undefined){
			res.render('login');
		}
		else{
		let profileData = {
			username: req.session.user.username,
			email: req.session.user.email
		};
		let fileNames = fs.readdirSync('./public/upload');
		renderProfile(req, res, profileData, fileNames, Upload);	
		}
	});
}

function renderProfile(req, res, profileData, fileNames, Upload){
	let userFiles = [];

	Upload.find({username: profileData.username}, (err, data) => {
		for(var i = 0; i < data.length; i++){
			for(var j = 0; j < fileNames.length; j++){
				if(data[i].filename == fileNames[j]){
					userFiles.push(fileNames[j]);
				}
			}
		}
		if(err){

		}
		else{
			res.render('profile', {userFiles: userFiles});		
		}
	});
}