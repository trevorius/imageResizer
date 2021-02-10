const sharp = require('sharp');
const fs = require('fs');
const directory = './images';

// const originalWidth = ;
// const originalHeight = ;
const sizes = [200, 300, 400];

let fileNoExt;

const newdirectory = (file) => {
  if (fs.lstatSync(directory + "/" + file).isFile()) {

    fileNoExt = removeExt(file)
  } else {
    fileNoExt = file
  }
  const dir = directory + "/" + fileNoExt;
  //if directory doesn't exist create it

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  return dir
}

const removeExt = (file) => file.slice(0, -4)

const resize = (sizes) => {
  sizes.forEach(size => {
    fs.readdirSync(directory).forEach(file => {
      if (fs.lstatSync(directory + "/" + file).isFile()) {

        newDir = newdirectory(file)
        sharp(`${directory}/${file}`)
          .resize({ width: size }) // width, height
          .toFile(`${newDir}/${removeExt(file)}-${size.toString()}w.jpg`);
      }
    });
  })
}

resize(sizes)
