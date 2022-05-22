const fs = require('fs');
const path = require('path');
let adress = path.join(__dirname, 'assets')
let adressCopy = path.join(__dirname, 'project-dist', 'assets')

fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, err => {
    if (err) throw err;
});

fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true}, err => {
    if (err) throw err;
});

fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'),
                    '',
                    (err) => {
                        if (err) throw err;
                    }
                );



const stream = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
let data = '';
stream.on('data', chunk => data += chunk);
stream.on('end', () => {
    let regexp = /\{\{.{1,}\}\}/g;
    data = data.toString();
    let tagArr = data.match(regexp);
    let i = 0;
    const readWriteFile = (i) => {
        regexp = new RegExp(`${tagArr[i]}`);
            const streamTemp = fs.createReadStream(path.join(__dirname, 'components', `${tagArr[i].slice(2,-2)}.html`), 'utf-8');
            let dataTemp = '';
            streamTemp.on('data', chunk => dataTemp += chunk);
            streamTemp.on('end', () => {
                data = data.replace(regexp, dataTemp)
                fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'),
                        data,
                        (err) => {
                            if (err) throw err;
                        }
                    );
                    i += 1;
                  if (i < tagArr.length) {
                    readWriteFile(i)
                  }
            })
    }
    readWriteFile(i);
})

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    for (let i=0; i<files.length; i += 1) {
        if (files[i].isFile() && path.extname(files[i].name) === '.css') {           
            const stream = fs.createReadStream(path.join(__dirname, 'styles', files[i].name), 'utf-8');
            let data = '';
            stream.on('data', chunk => data += chunk);
            stream.on('end', () => {
                fs.appendFile(
                    path.join(__dirname, 'project-dist', 'style.css'),
                    data,
                    err => {
                        if (err) throw err;
                    }
                );
            })
        }
    }
  });

  const checkFile = (adress, adressCopy) => {
    fs.readdir(adress, {withFileTypes: true}, (err, files) => {
        if (err) throw err;
        for (let i=0; i<files.length; i += 1) {
            if (files[i].isFile()) {

                fs.copyFile (path.join(adress, files[i].name), path.join(adressCopy, files[i].name), 
                err=> {if (err) throw err;})
            } else if (files[i].isDirectory()) {
                let newAdressCopy = path.join(adressCopy, files[i].name);
                fs.mkdir(newAdressCopy, {recursive: true}, err => {
                    if (err) throw err;
                });
                let newAdress = path.join(adress, files[i].name);
                checkFile(newAdress, newAdressCopy)
            }
        }
      });
}

checkFile(adress, adressCopy)