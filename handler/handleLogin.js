module.exports = function(app, urlencodedParser, User){
	app.post('/login',urlencodedParser ,function(req, res){
		let userData = {
			username: req.body.username,
			password: req.body.password
		};
		makeLogin(User, userData, req, res);
	});
}

function makeLogin(User, userData, req, res){
	User.findOne({'username': userData.username, 'password': userData.password}, function(err, data){
		if(err){

		}
		if(data){
			req.session.user = {
				username: data.username,
				email: data.email
			};
			
			res.redirect('/');
		}
	});
}