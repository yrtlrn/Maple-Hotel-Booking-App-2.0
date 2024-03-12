import multer from "multer";
import path from "path";

const multerStorage = multer.memoryStorage();

export const upload = multer({
    storage: multerStorage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(null, false);
            console.log("Herer");
            throw new Error("Unsupported file type!");
        }
        console.log("Here");
        cb(null, true);
    },
});
