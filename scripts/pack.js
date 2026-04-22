// Simple pack script to zip the extension
const fs = require('fs');
const archiver = require('archiver');

const output = fs.createWriteStream('d2jsp-post-text-color-remover.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', function () {
  console.log(archive.pointer() + ' total bytes');
  console.log('Extension packed as d2jsp-post-text-color-remover.zip');
});

archive.on('error', function(err){
  throw err;
});

archive.pipe(output);
archive.glob('**/*', {
  ignore: ['d2jsp-post-text-color-remover.zip', 'node_modules/**', '*.log']
});
archive.finalize();
