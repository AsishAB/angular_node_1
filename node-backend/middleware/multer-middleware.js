const multer = require("multer");

const storageProfile = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'profile_image/')
    },
    filename: (req, file, cb) => {
        let splitted_name = file.originalname.split(".");
        let name1 = splitted_name[0].toLowerCase().split(" ").join("-");
        let name2 = splitted_name[1].toLowerCase();

        const full_file_name = name1+Date.now()+"."+name2;
        cb(null, full_file_name);
    }
});

const storagePost =  multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "file_uploads/")
    },
    filename: (req, file, cb) => {
        let splitted_name = file.originalname.split(".");
        let name1 = splitted_name[0].toLowerCase().split(" ").join("-");
        let name2 = splitted_name[1].toLowerCase();

        const full_file_name = name1+Date.now()+"."+name2;
        cb(null, full_file_name);

    }

});

const multerMiddleware = (storageOption) => {
    if(storageOption == "profile"){
      return  multer({storage: storageProfile}).any();

    } else  if(storageOption == "posts"){
        return multer({storage: storagePost}).any();
    }   
}
// app.use(express.static(path.join(__dirname,"public")));

module.exports = multerMiddleware;
