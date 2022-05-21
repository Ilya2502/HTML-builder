const fs = require('fs');
const path = require('path');
const { stdout, stdin, exit } = process;
let message;

process.on('exit', () => stdout.write('Благодарствую, надеюсь мои мучения с Node не прошли даром...'));
process.on('SIGINT', () => exit());

fs.writeFile(
        path.join(__dirname, 'text.txt'),
        '',
        (err) => {
            if (err) throw err;
        }
    );

stdout.write('Закиньте пару слов в txt файлик\n')

stdin.on('data', (data) => {
    message = data.toString();
    if (message.trim() === 'exit') {
        exit();
    }
    fs.appendFile(
        path.join(__dirname, 'text.txt'),
        message,
        err => {
            if (err) throw err;
        }
    );
})



