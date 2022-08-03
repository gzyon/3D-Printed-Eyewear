// const {Storage} = require('@google-cloud/storage');

// // Creates a client
// const storage = new Storage();

// async function downloadIntoMemory(storage, bucketName, fileName) {
//   // Downloads the file into a buffer in memory.
//   const contents = await storage.bucket(bucketName).file(fileName).download();

//   console.log(
//     `Contents of gs://${bucketName}/${fileName} are ${contents.toString()}.`
//   );

//   return contents;
// }
