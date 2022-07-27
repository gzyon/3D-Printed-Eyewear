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
  
// app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({storage}).single('file');

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