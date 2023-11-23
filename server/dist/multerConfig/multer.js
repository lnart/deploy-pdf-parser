"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadsdir = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/Users/lennartp./pdf-upload-parser/server/src/multerConfig/uploads');
    },
    filename: function (req, file, cb) {
        if (!file.originalname) {
            cb(new Error('Original filename is undefined'), file.originalname);
        }
        else {
            cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
        }
    }
});
exports.upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (path_1.default.extname(file.originalname) !== '.pdf') {
            return cb(new Error('only PDF files are allowed'));
        }
        cb(null, true);
    }
});
exports.uploadsdir = path_1.default.join(__dirname, 'uploads');
if (!fs_1.default.existsSync(exports.uploadsdir)) {
    fs_1.default.mkdirSync(exports.uploadsdir, { recursive: true });
}
//# sourceMappingURL=multer.js.map