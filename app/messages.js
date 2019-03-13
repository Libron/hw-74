const express = require('express');
const router = express.Router();
const fs = require('fs');

const dir = "./app/messages";

const initFolder = () => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
};

router.get('/', (req, res) => {
    initFolder();
    fs.readdir(dir, (err, files) => {
        if (err) throw err;
        const messages = [];

        files.forEach(file => {
            const filePath = dir + '/' + file;
            const data = fs.readFileSync(filePath);
            messages.push(JSON.parse(data));
        });
        res.send(messages.reverse().slice(0, 5));
    });
});

router.post('/', (req, res) => {
    initFolder();
    const datetime = new Date().toISOString();
    const filename = dir + '/' + datetime + '.txt';
    const reqBody = req.body;
    reqBody.dateTime = datetime;
        fs.writeFile(filename, JSON.stringify(reqBody), err => {
           if (err) {
              console.error(err);
           } else {
              console.log('File was saved!');
           }
        });
    res.send(reqBody);
});

module.exports = router;