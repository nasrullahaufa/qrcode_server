var fs = require('fs')
var uploadPath = `./public/documents/${(new Date).toISOString().substring(0, 10)}`
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        fs.exists(uploadPath, function(exists) {
            if(exists) {
                console.log('udah ada');
                callBack(null, `./public/documents/${(new Date).toISOString().substring(0, 10)}`)
            }
            else {
              fs.mkdir(uploadPath, function(err) {
                if(err) {
                  console.log('Error in folder creation');
                  next(); 
                }  
                console.log('belom ada');
                callBack(null, `./public/documents/${(new Date).toISOString().substring(0, 10)}`)
              })
            }
         })






        //callBack(null, './public/documents')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
  })
let upload = multer({ storage:storage})



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
module.exports = upload