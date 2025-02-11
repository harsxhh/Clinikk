const express = require("express");
const multer = require("multer");
const FileController = require("../controllers/fileController");
const FileService = require("../services/fileService");
const File = require("../models/file"); 
const cloudinary = require("../config/cloudinary"); 
const errorHandler = require("../middleware/errorHandler");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const fileService = new FileService(cloudinary, File);
const fileController = new FileController(fileService, File);

router.post("/upload", upload.single("file"), fileController.uploadMedia);
router.get("/files", fileController.fetchMedia);

router.use(errorHandler);

module.exports = router;