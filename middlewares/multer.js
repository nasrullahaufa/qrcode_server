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
      let storageName = ''
      for(let i = 0; i <file.originalname.length;i++){
        if(file.originalname[i] !== ' '){
          storageName += file.originalname[i]
        }else{
          storageName += '_'
        }
      }
      console.log(storageName);
      req.storageName = storageName
        callBack(null, `${storageName}`)
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