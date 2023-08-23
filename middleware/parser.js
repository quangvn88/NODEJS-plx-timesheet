const parser = require("body-parser");

const bodyParser = (app) => {
    try {
        //Parse xxx-form-undeled
        app.use(parser.urlencoded({ extended: true }));
        // for parsing application/json
        app.use(parser.json());
        // for parsing multipart/form-data
        // Chỉ dùng cho từng route tránh xung đột specific router
        // const upload = multer();
        // app.use(upload.array());
    } catch (error) {

    }
}

module.exports = {bodyParser}