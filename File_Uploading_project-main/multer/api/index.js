const express = require('express');
const multer = require('multer');
const cors = require('cors');
const connection = require('./utils/files');
const filesModel = require('./models/files.models');

const app = express();
const upload = require('./config/multer');


app.use('/', express.static('uploads'));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  try {
    const filename = req.file.filename;
    const filePath = req.file.path;

    console.log('Uploaded file:', filename);
    console.log('File path:', filePath);

    const newFile = await filesModel.create({ filename });
    console.log('File saved to database:', newFile);

    res.status(201).json({
      message: 'File uploaded and saved successfully!',
      file: {
        filename,
        path: filePath,
      },
    });
  } catch (error) {
    console.error('Error saving file:', error);
    res.status(500).json({ message: 'Error saving file.' });
  }
});

app.get('/files', async (req, res) => {
  try {
    const files = await filesModel.find();
    res.status(200).json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ message: 'Error fetching files.' });
  }
});





app.listen(8080, () => {
  connection();
  console.log('Server is running on http://localhost:8080');
});
