module.exports = function(app, fs, Upload){
	
	/*
		get index
	*/

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

	/*
		get registration
	*/

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

	/*
		get login
	*/

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

	/*
		get upload
	*/

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

	/*
		get profile
	*/

	app.get('/profile', (req, res) => {
		if(req.session.user == undefined){
			res.render('login');
		}
		else{
			res.render('profile');
		}
	});

	/*
		get userUploads
	*/

	app.get('/userUploads', (req, res) => {
		if(req.session.user == undefined){
			res.render('login');
		}
		else{
			res.render('userUploads');
		}
	});
}
