import express from 'express';
import multer from 'multer';
import path from 'path';

const app = express();
const port = 5000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
  const filePath = req.file?.path; // Optional chaining here

  if (filePath) {
    res.json({ path: filePath });
  } else {
    res.status(400).json({ error: 'File upload failed' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello, this is the root route!');
});

app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);
});