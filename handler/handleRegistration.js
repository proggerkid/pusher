module.exports = function(app, urlencodedParser, User){
	app.post('/registration', urlencodedParser, function(req, res){
		let missingMessage = "";
		if(req.body.username == ""){
			missingMessage = "Username is missing. "
		}
		if(req.body.email == ""){
			missingMessage += "Email is missing. "
		}
		if(req.body.password == ""){
			missingMessage += "Password is missing. "
		}
		if(missingMessage != ""){
			res.render('registration', {missingMessage: missingMessage, errors: false});
		}
		else{
			let userData = {
				username: req.body.username,
				email: req.body.email,
				password: req.body.password
			};
			makeRegistration(userData, User, res);	
		}
	});
};


function makeRegistration(userData, User, res){
	let errors = {
		username: false,
		email: false
	};

	User.find({}, function(err, data){
		if(err){

		}
		console.log(data);
		for(var i = 0; i < data.length; i++){
			if(data[i].username == userData.username){
				errors.username = true;
			}
			if(data[i].email == userData.email){
				errors.email = true;
			}
		}
		if(errors.username == true || errors.email == true){
			res.render('registration',{errors: errors, status: ""});
		}
		if(errors.username == false && errors.email == false){
			let newUser = new User({
				username: userData.username,
				email: userData.email,
				password: userData.password
			});
			newUser.save();
			res.render('index', {status: "You are registrated"});
		}
	});
}