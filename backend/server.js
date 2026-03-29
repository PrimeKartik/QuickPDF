const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const libre = require('libreoffice-convert');
const { PDFDocument } = require('pdf-lib');

// Set the binary path for libreoffice-convert based on OS
if (process.platform === 'win32') {
    process.env.SOFFICE_BINARY = 'C:\\Program Files\\LibreOffice\\program\\soffice.exe';
} else {
    // Rely on Docker ENV var /usr/bin/soffice for Railway/Linux
    process.env.SOFFICE_BINARY = process.env.SOFFICE_BINARY || '/usr/bin/soffice';
}

const app = express();
app.use(cors());

// Configure Multer for local storage
const upload = multer({ dest: 'uploads/' });

// Ensure output directory exists
const outputDir = path.join(__dirname, 'outputs');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.post('/api/convert', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');
    if (!req.file.originalname.endsWith('.docx')) return res.status(400).send('Only .docx files are supported.');

    const inputPath = req.file.path;
    const outputPath = path.join(outputDir, `${req.file.filename}.pdf`);
    
    const file = fs.readFileSync(inputPath);
    
    libre.convert(file, '.pdf', undefined, (err, done) => {
        if (err) {
            console.error(`Error converting file: ${err}`);
            return res.status(500).send('Conversion failed.');
        }
        
        fs.writeFileSync(outputPath, done);
        
        res.download(outputPath, `${req.file.originalname.replace('.docx', '.pdf')}`, (downloadErr) => {
            // Cleanup
            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);
        });
    });
});

app.post('/api/merge', upload.array('files'), async (req, res) => {
    if (!req.files || req.files.length < 2) {
        return res.status(400).send('Please upload at least 2 PDF files to merge.');
    }

    try {
        const mergedPdf = await PDFDocument.create();
        
        for (const file of req.files) {
            if (!file.originalname.endsWith('.pdf')) {
                continue;
            }
            
            const pdfBytes = fs.readFileSync(file.path);
            const pdfDoc = await PDFDocument.load(pdfBytes);
            const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        const mergedPdfBytes = await mergedPdf.save();
        const outputPath = path.join(outputDir, `merged_${Date.now()}.pdf`);
        fs.writeFileSync(outputPath, mergedPdfBytes);

        res.download(outputPath, 'merged.pdf', (err) => {
            // Cleanup input files
            req.files.forEach(file => fs.unlinkSync(file.path));
            // Cleanup output file
            fs.unlinkSync(outputPath);
        });
    } catch (err) {
        console.error('Merge error:', err);
        res.status(500).send('Merge failed.');
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
