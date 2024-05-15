const puppeteer = require('puppeteer');
const middleware = require('./utils/middleware');
const validation = require('./utils/validation');
const fs = require('fs');
const Handlebars = require('handlebars');
const express = require('express');
require('dotenv').config();

const { env } = process;

const app = express();
app.use(express.json());
app.use('/files', express.static('certificates'));
const port = env.PORT;

app.post(
  '/generate-certificate',
  middleware.validateRequest(validation.generateCertificateSchema),
  async(req, res) => {
    try {
      const {
        employeeName,
        courseName,
        courseTaken,
        validUntil,
        certificateId,
        picTitle,
        picSignatureBase64,
        picName,
      } = req.body;
      // Create a browser instance
      const browser = await puppeteer.launch();

      // Create a new page
      const page = await browser.newPage();

      // Get HTML content from HTML file
      const templateHBS = fs.readFileSync('templates/certificate.hbs', 'utf-8');

      // Compile the template
      const template = Handlebars.compile(templateHBS);

      // Define the key-value pairs
      const data = {
        htmlTitle: `[${certificateId}] ${employeeName} - ${courseName}`,
        employeeName,
        courseName,
        courseTaken,
        validUntil,
        picTitle,
        picSignatureBase64,
        picName,
      };

      // Generate the HTML
      const resultHTML = template(data);

      await page.setContent(resultHTML, { waitUntil: 'domcontentloaded' });

      // To reflect CSS used for screens instead of print
      await page.emulateMediaType('screen');

      // Download the PDF
      await page.pdf({
        path: `certificates/${certificateId}.pdf`,
        printBackground: true,
        format: 'A4',
      });

      // Close the browser instance
      await browser.close();

      res.status(201).send({
        message: 'Certificate PDF generated successfully!',
      });
    } catch (error) {
      res.status(500).send({
        message: `Error: ${error.message}`,
      });
    }
  },
);

app.get('/certificate/:certificateId', (req, res) => {
  const certificateId = req.params.certificateId;
  try {
    fs.readFileSync(`certificates/${certificateId}.pdf`, 'utf-8');
    const certificateUrl =
      req.protocol +
      '://' +
      req.get('host') +
      '/files/' +
      certificateId +
      '.pdf';

    res.send({
      message: {
        certificateUrl,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: 'Error: Certificate not found!',
    });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
