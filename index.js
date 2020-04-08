const fs = require("fs");
const sharp = require("sharp");

// Set constants
const filesDirectory = "./original-images";
const convertedFilesWithoutRotateDirectory = "./converted-images-without-rotate";
const convertedFilesWithRotateDirectory = "./converted-images-with-rotate";
const directoryFiles = fs.readdirSync(filesDirectory);

// Create directory if not exists
if (!fs.existsSync(convertedFilesWithoutRotateDirectory)){
  fs.mkdirSync(convertedFilesWithoutRotateDirectory);
}
if (!fs.existsSync(convertedFilesWithRotateDirectory)){
  fs.mkdirSync(convertedFilesWithRotateDirectory);
}

// Sharp execution
const promises = directoryFiles.map((file) => {
  const sharpFile = sharp(`${filesDirectory}/${file}`);
  return sharp(`${filesDirectory}/${file}`)
    .metadata()
    .then((metadata) => {
      // Show metadata
      console.log(`${file} metadata:`)
      console.log(metadata);
      // Save file without rotate
      return sharpFile.toFile(`${convertedFilesWithoutRotateDirectory}/${file}`);
    })
    .then(() => {
      // Save file with rotate
      return sharpFile.rotate().toFile(`${convertedFilesWithRotateDirectory}/${file}`)
    });
});

Promise.all(promises)
  .then((files) => console.log("Files converted successfully"))
  .catch((err) => console.log(err));
