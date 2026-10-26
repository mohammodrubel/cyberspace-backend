import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import config from '../config';

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

export const sendImageToCloudinary = (
  filePath: string,
  imageName: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      return reject(new Error(`File not found at path: ${filePath}`));
    }

    try {
      fs.accessSync(filePath, fs.constants.R_OK);
    } catch {
      return reject(new Error(`File is not readable: ${filePath}`));
    }

    // 🧹 Sanitize imageName — remove extension, spaces & special chars
    const baseName = path.parse(imageName).name;
    const safeName = baseName
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .replace(/[^a-zA-Z0-9_-]/g, '') // Remove all invalid characters
      .toLowerCase();

    console.log('Uploading to Cloudinary:', { filePath, safeName });

    cloudinary.uploader.upload(
      filePath,
      {
        public_id: safeName, // ✅ safe name only
        resource_type: 'raw',
        format:"pdf"
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return reject(
            new Error(`Cloudinary upload failed: ${error.message}`),
          );
        }

        if (!result) {
          return reject(new Error('No response from Cloudinary'));
        }
        console.log(result)
        const secureUrl = result.secure_url;
        console.log('✅ Upload successful →', secureUrl);

        fs.unlink(filePath, (err) => {
          if (err) console.warn('⚠️ Failed to delete local file:', err);
          resolve(secureUrl);
        });
      },
    );
  });
};
// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory:', uploadsDir);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: function (
    req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void,
  ) {
    cb(null, uploadsDir);
  },
  filename: function (
    req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const originalName = path.parse(file.originalname).name; // Get filename without extension
    const extension = path.extname(file.originalname); // Get file extension
    cb(null, originalName + '-' + uniqueSuffix + extension);
  },
});

// File filter for images only
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowedMimeTypes = [
    'application/pdf', 
];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file type. Only ${allowedMimeTypes.join(', ')} are allowed`,
      ),
    );
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});