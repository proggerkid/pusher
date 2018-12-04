let path = require('path');

module.exports = function(multer){
	let storage = multer.diskStorage({
			  destination: function (req, file, cb) {
			    cb(null, './public/upload')
			  },
			  filename: function (req, file, cb) {
			    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
			  }
			});

	let upload = multer({
		storage: storage,
		fileFilter: function(req, file, cb){
			checkFileType(file, cb);
		}
	}).single('image');

	function checkFileType(file, cb){
		const filetypes = /jpg|jpeg|png|gif/;
		const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
		const mimetype = filetypes.test(file.mimetype);

		if(mimetype && extname){
			cb(null, true);
		}
		else{
			cb('Error: Images only');
		}
	}
	return upload;
}
