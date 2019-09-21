const express = require('express');
const router = express.Router();
const PDFParser = require("pdf2json");

const fs = require('fs');
const request = require('request');

const multer  = require('multer')
const upload = multer({ dest: './files/' })

router.post('/', upload.single('pdfFile'), loadPDFAndTransform);
module.exports = router;

function loadPDFAndTransform(req, res, next) {
	if (req && req.body && req.body.url){
		let filename = req.body.url.substring(req.body.url.lastIndexOf('/')+1).split(".")[0]
            + Date.now().toString()+".pdf";
        let filePath = './files/'+filename;
		downloadPDF(req.body.url,filePath, function(err){
			if (err) {return res.status(500).json({message:err.toString()});}

			parsePDF(filePath,function(err,pdfData){
                if (err) {return res.status(500).json({message:err.toString()});}
                fs.unlink(filePath, (err) => {});
                return res.status(200).json(pdfData);
            })
		})
	}

	else if (req && req.file){
        let filePath = req.file.path;
		parsePDF(filePath,function(err,pdfData){
                if (err) {return res.status(500).json({message:err.toString()});}
                fs.unlink(filePath, (err) => {});
                return res.status(200).json(pdfData);
        })
	}
}

function downloadPDF(url, dest, cb) {
    const file = fs.createWriteStream(dest);
    const sendReq = request.get(url);

    // verify response code
    sendReq.on('response', (response) => {
        if (response.statusCode !== 200) {
            return cb('Response status was ' + response.statusCode);
        }

        sendReq.pipe(file);
    });

    // close() is async, call cb after close completes
    file.on('finish', () => file.close(cb));

    // check for request errors
    sendReq.on('error', (err) => {
        fs.unlink(dest);
        return cb(err.message);
    });

    file.on('error', (err) => { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        return cb(err.message);
    });
};

function parsePDF(filePath,cb){
    let pdfParser = new PDFParser();
 
    pdfParser.on("pdfParser_dataError", errData => cb(errData.toString));

    pdfParser.on("pdfParser_dataReady", pdfData => {
        //fs.writeFile("./jsons/"+req.file.originalname+".json", JSON.stringify(pdfData))
        cb(null,pdfData);
    });
 
    pdfParser.loadPDF(filePath);
}