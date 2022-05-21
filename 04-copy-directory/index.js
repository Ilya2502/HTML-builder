const fs = require('fs');
const path = require('path');
const way = path.join(__dirname, 'files');
const wayCopy = path.join(__dirname, 'files-copy');


const copyDir = () => {
    fs.mkdir(wayCopy, {recursive: true}, err => {
        if (err) throw err;
    });
    fs.readdir(way, 'utf-8', (err, files) => {
        if (err) throw err;
        for (let i=0; i<files.length; i += 1) {
            const stream = fs.createReadStream(path.join(way, files[i]), 'utf-8');
            let data = '';
            stream.on('data', chunk => data += chunk);
            stream.on('end', () => {
                fs.writeFile(path.join(wayCopy, files[i]),
                    data,
                    (err) => {
                        if (err) throw err;
                    }
                );
            })
        }
        fs.readdir(wayCopy, 'utf-8', (err, filesCopy) => {
            for (let i = 0; i<filesCopy.length; i+=1) {
                if (!files.includes(filesCopy[i])) {
                    fs.unlink(path.join(wayCopy, filesCopy[i]), err => {
                            if (err) throw err;
                        })
                }
            }
        })
    });
};


copyDir()
