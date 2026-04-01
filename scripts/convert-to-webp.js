const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images/webp');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all JPEG files
const jpegFiles = fs.readdirSync(imageDir).filter(file => 
  /\.(jpg|jpeg)$/i.test(file)
);

console.log(`Found ${jpegFiles.length} JPEG files to convert...`);

jpegFiles.forEach(file => {
  const inputPath = path.join(imageDir, file);
  const outputPath = path.join(outputDir, file.replace(/\.(jpg|jpeg)$/i, '.webp'));

  sharp(inputPath)
    .webp({ quality: 80 })
    .toFile(outputPath)
    .then(() => {
      const inputSize = fs.statSync(inputPath).size;
      const outputSize = fs.statSync(outputPath).size;
      const saved = (((inputSize - outputSize) / inputSize) * 100).toFixed(2);
      console.log(`✓ ${file} → ${path.basename(outputPath)} (saved ${saved}%)`);
    })
    .catch(err => {
      console.error(`✗ Error converting ${file}:`, err);
    });
});
