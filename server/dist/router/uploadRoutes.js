"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const router = (0, express_1.Router)();
const multer_1 = require("..//multerConfig/multer");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
router.post('/api/v1/upload', multer_1.upload.single('file'), async (req, res) => {
    if (req.file) {
        let buffer = fs_1.default.readFileSync(req.file.path);
        (0, pdf_parse_1.default)(buffer).then(function (data) {
            res.json({ text: data.text });
        });
    }
});
router.get('/api/v1/uploads', async (req, res) => {
    try {
        const files = fs_1.default.readdirSync(multer_1.uploadsdir);
        const pdfFiles = files.filter(file => path_1.default.extname(file).toLowerCase() === '.pdf');
        const fileData = await Promise.all(pdfFiles.map(async (file) => {
            const filePath = path_1.default.join(multer_1.uploadsdir, file);
            const dataBuffer = fs_1.default.readFileSync(filePath);
            const data = await (0, pdf_parse_1.default)(dataBuffer);
            return { filename: file, text: data.text };
        }));
        res.json(fileData);
    }
    catch (err) {
        console.error('Error reading files:', err);
        res.status(500).send('Error reading files');
    }
});
router.delete("/api/v1/delete/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path_1.default.join(multer_1.uploadsdir, filename);
    fs_1.default.unlink(filePath, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.status(404).json({ message: 'File not found' });
            }
            else {
                console.error('Error deleting file:', err);
                res.status(500).json({ message: 'Error deleting file' });
            }
        }
        else {
            res.status(200).json({ message: 'File deleted successfully' });
        }
    });
});
exports.default = router;
//# sourceMappingURL=uploadRoutes.js.map