const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
const corsOptions = {
    // credentials: true,
    origin: 'http://localhost:3000',  // сменил на http://<имя моего домена>
    // allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200
  };
app.use(cors());

const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();
const bucketName = "olive-eyewear-and-wellness-bucket"
const fileName = "frame1.obj"

const object_for_zoey = downloadIntoMemory(storage, bucketName, fileName).catch(console.error);
  
// app.use(express.static('public'));

const storage_local = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({storage_local}).single('file');

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err)
        }

        return res.status(200).send(req.files)
    })
});

app.listen(8000, () => {
    console.log('App is running on port 8000')
});