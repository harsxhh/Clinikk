const { z } = require("zod");
const asyncHandler = require("../utils/asyncHandler");

const FILE_TYPES = {
  AUDIO: "audio",
  VIDEO: "video",
};

const fetchMediaSchema = z.object({
  type: z.enum([FILE_TYPES.AUDIO, FILE_TYPES.VIDEO]).optional(),
});

class FileController {
  constructor(fileService, fileModel) {
    this.fileService = fileService;
    this.fileModel = fileModel;
  }

  uploadMedia = asyncHandler(async (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const isAudio = file.mimetype.startsWith("audio/");
    const type = isAudio ? FILE_TYPES.AUDIO : FILE_TYPES.VIDEO;

    const newFile = await this.fileService.uploadFile(file, type);
    res.json({ message: "File uploaded successfully", file: newFile });
  });

  fetchMedia = asyncHandler(async (req, res) => {
    const { type } = fetchMediaSchema.pick({ type: true }).parse(req.query);
    const query = type ? { type } : {};
    const files = await this.fileModel.find(query).sort({ uploadedAt: -1 });
    res.json(files);
  });
  
}

module.exports = FileController;