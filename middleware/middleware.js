const multer        = require('multer'),
	  GridFsStorage = require('multer-gridfs-storage'),
	  Grid          = require('gridfs-stream'),
	  crypto        = require('crypto'),
	  path          = require("path");
	  
var middlewareObject = {};

const mongoURI = 'mongodb://localhost:27017/mydb';

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        	crypto.randomBytes(16, (err,buf) => {
				if(err){
					return reject(err);
				}
				const filename = buf.toString('hex') + path.extname(file.originalname);
				// if(file.mimetype == "")
				const fileInfo = {
				filename: filename,
				bucketName: 'uploads'
				};
				resolve(fileInfo);
        	});
    	});
    }
});

middlewareObject.upload = multer({ storage });

module.exports = middlewareObject;

