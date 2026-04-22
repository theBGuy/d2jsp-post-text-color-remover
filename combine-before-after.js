// Combines before.png and after.png with labels into one image for Chrome Store
const sharp = require('sharp');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
const beforePath = path.join(imagesDir, 'before.png');
const afterPath = path.join(imagesDir, 'after.png');
const outputPath = path.join(imagesDir, 'before-after-combined.png');

const labelHeight = 48;
const labelFontSize = 36;
const labelColor = '#ffffff';
const labelBg = '#222';

async function createLabel(text, width) {
  // SVG label
  return Buffer.from(`
    <svg width='${width}' height='${labelHeight}'>
      <rect width='100%' height='100%' fill='${labelBg}'/>
      <text x='50%' y='60%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='${labelFontSize}' fill='${labelColor}'>${text}</text>
    </svg>
  `);
}

(async () => {
  const beforeImg = sharp(beforePath);
  const afterImg = sharp(afterPath);
  const beforeMeta = await beforeImg.metadata();
  const afterMeta = await afterImg.metadata();
  const width = Math.max(beforeMeta.width, afterMeta.width, 1280);
  const minHeight = 800;

  const beforeLabel = await createLabel('BEFORE', width);
  const afterLabel = await createLabel('AFTER', width);

  const beforeWithLabel = await sharp({
    create: {
      width,
      height: beforeMeta.height + labelHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      { input: beforeLabel, top: 0, left: Math.floor((width - beforeMeta.width) / 2) },
      { input: await beforeImg.png().toBuffer(), top: labelHeight, left: Math.floor((width - beforeMeta.width) / 2) }
    ])
    .png()
    .toBuffer();

  const afterWithLabel = await sharp({
    create: {
      width,
      height: afterMeta.height + labelHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      { input: afterLabel, top: 0, left: Math.floor((width - afterMeta.width) / 2) },
      { input: await afterImg.png().toBuffer(), top: labelHeight, left: Math.floor((width - afterMeta.width) / 2) }
    ])
    .png()
    .toBuffer();

  const combinedHeight = beforeMeta.height + afterMeta.height + labelHeight * 2;
  const finalHeight = Math.max(combinedHeight, minHeight);
  const topOffset = Math.floor((finalHeight - combinedHeight) / 2);

  // Compose the final image with white background, no alpha
  const combinedImage = await sharp({
    create: {
      width,
      height: finalHeight,
      channels: 3,
      background: { r: 255, g: 255, b: 255 }
    }
  })
    .composite([
      { input: beforeWithLabel, top: topOffset, left: 0 },
      { input: afterWithLabel, top: topOffset + beforeMeta.height + labelHeight, left: 0 }
    ])
    .png()
    .toBuffer();

  // Scale to exactly 1280x800, preserving aspect ratio and padding with white if needed
  await sharp(combinedImage)
    .resize(1280, 800, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255 }
    })
    .png()
    .toFile(outputPath.replace(/\.png$/, '-1280x800.png'));

  console.log('Combined image saved to', outputPath.replace(/\.png$/, '-1280x800.png'));
})();
