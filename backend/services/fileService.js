class FileService {
    constructor(cloudinary, fileModel) {
      this.cloudinary = cloudinary;
      this.fileModel = fileModel;
    }
  
    async uploadFile(file, type) {
      const folderName = type === "audio" ? "AudioUploads" : "VideoUploads";
  
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = this.cloudinary.uploader.upload_stream(
          { resource_type: "auto", folder: folderName },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(file.buffer);
      });
  
      const transformedUrl = uploadResult.secure_url.replace("/upload/", "/upload/f_auto/");
  
      const newFile = new this.fileModel({
        fileName: file.originalname,
        fileUrl: transformedUrl,
        type: type,
        format: uploadResult.format,
      });
  
      await newFile.save();
      return newFile;
    }
  }
  
module.exports = FileService;