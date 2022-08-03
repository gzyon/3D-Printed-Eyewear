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

// const object_for_zoey = downloadIntoMemory(storage, bucketName, fileName).catch(console.error);
  
// async function downloadIntoMemory(storage, bucketName, fileName) {
// // Downloads the file into a buffer in memory.
// const contents = await storage.bucket(bucketName).file(fileName).download();

// console.log(
//     `Contents of gs://${bucketName}/${fileName} are ${contents.toString()}.`
// );

// return contents;
// }
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

const downloadIntoMemory = async () => {
    const contents = await storage.bucket(bucketName).file(fileName).download()
    
    console.log(
        `Contents of gs://${bucketName}/${fileName} are ${contents.toString()}.`
    );

    return contents
}

app.get('/', (req, res) => {
    return res.status(200).send('Server is running...')
})

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err)
        }

        return res.status(200).send(req.files)
    })
});

app.get('/frame/', async (req, res) => {
    // const fileName = "frame2.obj"

    // 1. req or params (/frame/:id) should contain the filename of the object to be retrieved
    // 2. the bucket is currently public. future work: should set it to private (med priority)
    //      -- retrieve file link from private bucket can be done using signed url https://cloud.google.com/storage/docs/access-control/signing-urls-with-helpers#storage-signed-url-object-nodejs

    const [metadata] = await storage.bucket(bucketName).file(fileName).getMetadata()
    console.log(metadata.mediaLink)
    return res.status(200).send({'mediaLink': metadata.mediaLink})
})

app.listen(8000, () => {
    console.log('App is running on port 8000')
});