const express = require('express')
const router = express.Router()
const documentsController = require("../controllers/documentsController")
const upload = require('../middlewares/multer') //helper multer untuk route upload
const authenticate = require("../middlewares/authentication")
//disini tdk diprotect authentication
router.get('/:id/:name',documentsController.downloadOne)
router.use(authenticate) // middleware authentication jwt
router.get('/',documentsController.getAll)
router.post('/', upload.single('File'), documentsController.uploadDocument) //middleware multer



module.exports = router