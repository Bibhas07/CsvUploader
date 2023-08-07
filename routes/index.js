const express =  require('express');
const router = express.Router()
const multer = require('multer');
const path = require('path')
const csvContoller = require('../controllers/csvController')



const testFolder = './uploads'
const storage = multer.diskStorage({
    destination : function(req , file ,cb){
        return cb(null , "./uploads")
    },
    filename : function(req, file, cb){
        return cb(null , file.originalname)
    }
})


const upload = multer({storage}) 

router.get("/" , csvContoller.getfileList);



router.post('/upload' ,upload.single('profileImage'), csvContoller.getfileList)
router.get('/delete/:file' , csvContoller.delete)
router.get("/view/:filename",csvContoller.viewFiles );
//search 
router.post("/search/:filename",csvContoller.searchFiles)
router.get("/edit/:filename", csvContoller.editFiles );
router.post('/save/:filename', csvContoller.saveEditedFiles);


module.exports = router;