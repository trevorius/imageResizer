const sharp = require('sharp');
const fs = require('fs');
const directory = './images/toDo';

// const originalWidth = ;
// const originalHeight = ;

const sizes = [200, 300, 400];

const newdirectory = (file) => {
  let fileNoExt
  if (fs.lstatSync(directory + "/" + file).isFile()) {

    fileNoExt = file.slice(0, -4)
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

const resize = (sizes) => {
  sizes.forEach(size => {
    fs.readdirSync(directory).forEach(file => {
      if (fs.lstatSync(directory + "/" + file).isFile()) {

        newDir = newdirectory(file)
        sharp(`${directory}/${file}`)
          .resize({ width: size }) // width, height
          .toFile(`${newDir}/${file}-${size.toString()}w.jpg`);
      }
    });
  })
}

resize(sizes)
