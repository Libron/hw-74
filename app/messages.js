const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    const path = "./app/messages";

    fs.readdir(path, (err, files) => {
        if (err) throw err;
        const messages = [];

        files.forEach(file => {
            const filePath = path + '/' + file;
            const data = fs.readFileSync(filePath);
            messages.push(JSON.parse(data));
        });
        res.send(messages.slice(Math.max(messages.length - 5, 1)));
    });
});

router.post('/', (req, res) => {
    const datetime = new Date().toISOString();
    const filename = './app/messages/' + datetime + '.txt';
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