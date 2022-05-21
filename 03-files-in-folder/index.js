const fs = require('fs');
const path = require('path');
const way = path.join(__dirname, 'secret-folder');

const checkFile = (adress) => {
    console.log(adress)
    fs.readdir(adress, {withFileTypes: true}, (err, files) => {
        if (err) throw err;
        for (let i=0; i<files.length; i += 1) {
            if (files[i].isFile()) {
                fs.stat(path.join(adress, files[i].name), function(err, stats) {
                    if (err) throw err;
                    console.log(path.parse(path.join(adress, files[i].name)).name, ' - ', path.extname(files[i].name), ' - ', stats.size, 'b');
                })    
            } /*else if (files[i].isDirectory()) {
                let newAdress = path.join(adress, files[i].name);
                checkFile(newAdress)
            }*/
        }
      });
}

checkFile(way)