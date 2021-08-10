var fs = require('fs')
var uploadPath = ''


function checkUploadPath(req, res, next) {
    console.log('middleware');
     fs.exists(uploadPath, function(exists) {
        if(exists) {
          next();
        }
        else {
          fs.mkdir(uploadPath, function(err) {
            if(err) {
              console.log('Error in folder creation');
              next(); 
            }  
            next();
          })
        }
     })
}
module.exports = checkUploadPath