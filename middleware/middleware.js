const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require("path");

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

