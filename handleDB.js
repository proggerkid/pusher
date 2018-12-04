module.exports = {
	connectToDB: function(mongoose){
		mongoose.connect('mongodb://localhost/test');
		mongoose.connection.once('open', function(){
			console.log('connected to Database');
		});
		mongoose.connection.on('error', function(){
			console.log('fail to connect to Database');
		});
	},
	makeUser: function(mongoose){
		let userSchema = new mongoose.Schema({
			username: String,
			email: String,
			password: String
		});
		return mongoose.model('user', userSchema);
	},
	makeUpload: function(mongoose){
		let uploadSchema = new mongoose.Schema({
			username: String,
			email: String,
			filename: String
		});
		return mongoose.model('upload', uploadSchema);
	}
}