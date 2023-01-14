const express = require('express');
const app = express();
const fs = require('fs');
var path = require('path')
var extract = require('pdf-text-extract')
const cors = require('cors');
var download = require('download-pdf')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Legal AI backend' });
});

app.post('/pdf', (req, res) => {
    let pdf = req.body.pdfURL;
    let fileName = 'pdf-' + Date.now() + '.pdf';
    let filePath = path.join('./pdfs/', fileName);

    let options = {
        directory: "./pdfs/",
        filename: fileName
    }

    download(pdf, options, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error while downloading PDF' });
        }
        console.log("Done");

        extract(filePath, { splitPages: false }, function (err, text) {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Error while extracting text from PDF' });
            }
            console.log('text', text)
        })
    })

    res.status(200).json({ message: 'PDF downloaded' });
});


app.listen(8800, () => {
    console.log('Legal AI Backend listening on Port 8800!');
});


