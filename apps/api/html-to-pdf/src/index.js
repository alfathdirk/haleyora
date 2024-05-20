const puppeteer = require('puppeteer');
const middleware = require('./utils/middleware');
const validation = require('./utils/validation');
const fs = require('fs');
const Handlebars = require('handlebars');
const express = require('express');

const app = express();
app.use(express.json());
app.use('/files', express.static('/directus/certificates'));
const port = 3998;

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
      const browser = await puppeteer.launch({
        bindAddress: '0.0.0.0',
        env: {
          DISPLAY: ':10.0',
        },
        pipe: true,
        headless: true,
        dumpio: true,
        args: [
          '--headless',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--remote-debugging-port=9222',
          '--remote-debugging-address=0.0.0.0',
        ],
      });

      // Create a new page
      const page = await browser.newPage();

      // Get HTML content from HTML file
      const templateHBS = fs.readFileSync('/directus/templates/certificate.hbs', 'utf-8');

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
        path: `/directus/certificates/${certificateId}.pdf`,
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
  // try {
  // /directus/certificates
  fs.readFileSync(`/directus/certificates/${certificateId}.pdf`, 'utf-8');
  const certificateUrl =
      req.protocol +
      '://' +
      // req.get('host') +
      'localhost:3998' + // !! NEED TO RESOLVE FOR PRODUCTION
      '/files/' +
      certificateId +
      '.pdf';

  console.log('🚀 ~ app.get ~ certificateUrl:', certificateUrl);

  res.send({
    message: {
      certificateUrl,
    },
  });
  // }
  // catch (error) {
  //   console.log('🚀 ~ app.get ~ error:', error);
  //   res.status(500).send({
  //     message: 'Error: Certificate not found!',
  //   });
  // }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
