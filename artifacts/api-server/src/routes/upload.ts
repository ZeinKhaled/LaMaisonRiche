import { Router, type IRouter } from "express";
import multer from "multer";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const router: IRouter = Router();
const apiServerDir =
  path.basename(process.cwd()) === "api-server"
    ? process.cwd()
    : path.resolve(process.cwd(), "artifacts/api-server");
const uploadsDir = path.resolve(apiServerDir, "public/uploads");

function safeFilename(originalName: string) {
  const extension = path.extname(originalName).toLowerCase();
  const basename = path
    .basename(originalName, extension)
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return `${Date.now()}-${basename || "image"}${extension}`;
}

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    mkdir(uploadsDir, { recursive: true })
      .then(() => callback(null, uploadsDir))
      .catch((error: unknown) => callback(error as Error, uploadsDir));
  },
  filename: (_req, file, callback) => {
    callback(null, safeFilename(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 60 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (
      !file.mimetype.startsWith("image/") &&
      !file.mimetype.startsWith("video/")
    ) {
      callback(new Error("Only image or video files are allowed"));
      return;
    }
    callback(null, true);
  },
});

router.post("/upload", (req, res): void => {
  upload.single("image")(req, res, (error: unknown) => {
    if (error) {
      const message =
        error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE"
          ? "File must be 60 MB or smaller"
          : error instanceof Error
            ? error.message
            : "Unable to upload image";
      res.status(400).json({ error: message });
      return;
    }

    if (!req.file) {
      res.status(400).json({ error: "An image file is required" });
      return;
    }

    res.json({ url: `/uploads/${req.file.filename}` });
  });
});

export default router;
