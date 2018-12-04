module.exports = function(app, upload, fs, Upload){
	app.post('/upload', (req, res) => {
		upload(req, res, (err) => {
			if(err){
				res.render('upload', {msg: err, fileNames: ""});
			}
			else{
				makeUpload(Upload, req);
				res.redirect('/upload');
			}
		});
	});
}

function makeUpload(Upload, req){
	Upload.find({}, (err, data) => {
		if(err){

		}
		else{
			let newUpload = new Upload({
				username: req.session.user.username,
				email: req.session.user.email,
				filename: req.file.filename
			});
			newUpload.save();
		}
	});
}